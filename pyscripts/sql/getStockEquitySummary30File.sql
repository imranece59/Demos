SELECT
     sc_code,
     sc_name,
     current_closing_price,
     cp_moving_avg_30_days,
     cp_moving_avg_30_match_status
FROM
      stock_equity_summary
WHERE
      processed_date >= CURRENT_DATE
ORDER BY
      sc_code