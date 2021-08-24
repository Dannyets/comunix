export const insertInto = (table, columnNames, columnValues) =>
  `INSERT INTO ${table}(${columnNames.join(",")}) VALUES (${columnValues.map(v => `"${v}"`).join(
    ","
  )});`;
