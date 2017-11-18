#!/bin/bash
export PGPASSFILE=~/.pgpass
start_date=2016-11-01
num_days=400
cd data
pwd
for i in `seq 0 $num_days`
do
    #date=`date +%d%m%y -d "${start_date}+${i} days"` 
	date=`date +%Y-%m-%d -d "${start_date}+${i} days"`
	formatteddate=$(date +%d%m%y -d "$date")
	filename="EQ"$formatteddate"_CSV.ZIP"
	actualfilename="EQ"$formatteddate".CSV"
	wget 'http://www.bseindia.com/download/BhavCopy/Equity/'$filename''
	unzip -o $filename
	awk -F"," 'BEGIN { OFS = "," } {if ($1!="SC_CODE") $14="'$date'"; print}' $actualfilename > "EQ"$formatteddate"_FORMATTED.csv"
	sed -i '1s/TDCLOINDI/TRADEDATE/' "EQ"$formatteddate"_FORMATTED.csv"
	modifiedfilename="EQ"$formatteddate"_CLEAN.csv"
	sed 's/\r//' "EQ"$formatteddate"_FORMATTED.csv" > $modifiedfilename
    rm -rf $filename
	rm -rf "EQ"$formatteddate"_FORMATTED.csv"
	rm -rf $actualfilename
	RUN_ON_MYDB="psql -X -w -U postgres  -h localhost -d stock_db --set ON_ERROR_STOP=on --set AUTOCOMMIT=off"
	$RUN_ON_MYDB <<SQL
	BEGIN;
	CREATE TEMP TABLE STAGE_DATA( 
  	sc_code  integer NOT NULL,
  	sc_name character varying(50) NOT NULL,
  	sc_group character varying(50),
  	sc_type character varying(50),
  	open_price double precision,
  	high_price double precision,
  	low_price double precision,
  	close_price double precision,
  	last_price double precision,
  	prevclose double precision,
  	no_of_trades double precision,
  	no_of_shares double precision,
  	net_turn_over double precision,
  	trade_date date NOT NULL) ON COMMIT DROP;
	\COPY STAGE_DATA(sc_code,sc_name,sc_group,sc_type,open_price,high_price,low_price,close_price,last_price,prevclose,no_of_trades,no_of_shares,net_turn_over,trade_date) FROM /home/mohamedimran/stock/data/$modifiedfilename with delimiter ',' csv header;
	INSERT INTO stock_equity_data(sc_code,sc_name,sc_group,sc_type,open_price,high_price,low_price,close_price,last_price,prevclose,no_of_trades,no_of_shares,net_turn_over,trade_date)
   	SELECT sc_code,sc_name,sc_group,sc_type,open_price,high_price,low_price,close_price,last_price,prevclose,no_of_trades,no_of_shares,net_turn_over,trade_date
   	FROM stage_data where sc_type ='Q'
  	ON CONFLICT ON CONSTRAINT stock_equity_data_pkey
  	DO NOTHING;
	COMMIT;
SQL
done
