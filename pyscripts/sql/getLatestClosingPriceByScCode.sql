SELECT
        close_price,sc_name
FROM
        stock_equity_data
WHERE
        sc_code  = SC_CODE
ORDER BY
      trade_date
DESC LIMIT 1