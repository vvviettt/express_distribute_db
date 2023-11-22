const { query } = require("mssql");

async function getUsers() {
  const init = process.env.INIT_NAME;
  console.log(init);
  if (init === "UDN") {
    const rs =
      await query(`SELECT [id], [name],[email],[roll],[isActive],[unitId]
  FROM users`);
    return rs.recordset;
  }
  const rs = await query(`SELECT [id], [name],[email],[roll],[isActive],[unitId]
  FROM users WHERE [users].[unitId] = '${init}' `);
  return rs.recordset;
}

module.exports = { getUsers };
