SELECT
   ROUND(AVG(A.close_price)::numeric,2) as avg_close_price
FROM (
      SELECT
        close_price
      FROM
        stock_equity_data
      WHERE
        sc_code  = SC_CODE
      ORDER BY
        trade_date

      DESC LIMIT LIMIT_RANGE) AS A;