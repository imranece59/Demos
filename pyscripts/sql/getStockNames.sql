SELECT
  sc_code
FROM
  stock_equity_data
WHERE
  sc_type = 'Q'
GROUP BY
  sc_code
ORDER BY
  sc_code

