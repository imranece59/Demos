INSERT INTO
	stock_equity_summary
	(processed_date,sc_code,sc_name,current_closing_price,cp_moving_avg_200_days,cp_moving_avg_50_days,cp_moving_avg_30_days,
	cp_moving_avg_200_match_status,cp_moving_avg_50_match_status,cp_moving_avg_30_match_status,created_date,updated_date)
VALUES
	(PROCESSED_DATE,SC_CODE,SC_NAME,CURRENT_CP,CP_MOVING_AVG_200D,CP_MOVING_AVG_50D,CP_MOVING_AVG_30D,CP_MOVING_AVG_200_STATUS,
	CP_MOVING_AVG_50_STATUS,CP_MOVING_AVG_30_STATUS,CREATED_DATE,UPDATE_DATE)
ON conflict ON  CONSTRAINT stock_equity_summary_pkey
DO UPDATE
SET
     current_closing_price = CURRENT_CP,
     cp_moving_avg_200_days = CP_MOVING_AVG_200D,
     cp_moving_avg_50_days = CP_MOVING_AVG_50D,
     cp_moving_avg_30_days = CP_MOVING_AVG_30D,
     cp_moving_avg_200_match_status = CP_MOVING_AVG_200_STATUS,
     cp_moving_avg_50_match_status = CP_MOVING_AVG_50_STATUS,
     cp_moving_avg_30_match_status = CP_MOVING_AVG_30_STATUS,
     updated_date   = UPDATE_DATE