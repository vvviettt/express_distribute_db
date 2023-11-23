const mssql = require("mssql");
async function addRequestService(desc, userId) {
  await mssql.query(`INSERT INTO requests(userId, [desc])
    VALUES ('${userId}', '${desc}')
  `);
  return;
}

async function getAllRequest() {
  const result = await mssql.query(
    "SELECT [requests].[id],[requests].[desc],[users].name, [users].[email], [users].[unitId],[requests].[isCompleted] FROM requests INNER JOIN users ON requests.userId =users.id"
  );
  return result.recordset;
}

async function checkRequest(req) {
  const { isChecked, request } = req;
  if (!!isChecked && !!request) {
    await mssql.query(
      `update requests set isCompleted = ${isChecked} where id = '${request}'`
    );
  }
  return;
}

module.exports = { addRequestService, getAllRequest, checkRequest };
