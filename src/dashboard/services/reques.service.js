const mssql = require("mssql");
async function addRequestService(desc, userId) {
  await mssql.query(`INSERT INTO requests(userId, [desc])
    VALUES ('${userId}', '${desc}')
  `);
  return;
}

module.exports = { addRequestService };
