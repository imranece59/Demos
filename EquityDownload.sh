#!/bin/bash
start_date=2016-11-01
num_days=400
cd data
pwd
for i in `seq 0 $num_days`
do
    date=`date +%d%m%y -d "${start_date}+${i} days"`   
    echo $date
	filename="EQ"$date"_CSV.ZIP"
	echo $filename
    wget 'http://www.bseindia.com/download/BhavCopy/Equity/'$filename''
    unzip $filename
    rm -rf $filename
done
