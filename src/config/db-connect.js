const sql = require("mssql");

async function connect() {
  try {
    await sql.connect(
      `Server=localhost,1433;Database=${process.env.SQL_DBNAME};User Id=${process.env.SQL_USERNAME};Password=${process.env.SQL_PASSWORD};Encrypt=true;Trusted_Connection=True;TrustServerCertificate=True;`
    );
    console.log("Connect success ");
  } catch (error) {
    console.log("Connect error", error);
  }
}
module.exports = { connect };
