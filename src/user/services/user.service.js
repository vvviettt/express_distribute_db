var sql = require("mssql");
var bcrypt = require("bcryptjs");

function getUserByEmail(email) {
  return new Promise(async function (resolve, reject) {
    try {
      const result = await sql.query(
        `select * from users where email = '${email}'`
      );
      console.log(result);
      if (result.recordset.length > 0) {
        return resolve(result.recordset[0]);
      }
      return reject(new Error("Email not found"));
    } catch (error) {
      return reject(new Error("Get user fail"));
    }
  });
}

function getUserById(id) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(
        `select * from users where id = CONVERT(uniqueidentifier,'${id}')`
      );
      const result = await sql.query(
        `select * from users where id = CONVERT(uniqueidentifier,'${id}')`
      );
      if (result.recordset.length > 0) {
        return resolve(result.recordset[0]);
      }
      return reject(new Error("Email not found"));
    } catch (error) {
      return reject(new Error("Get user fail"));
    }
  });
}

async function changeActive(useId, isActive) {
  return await sql.query(
    `update users set isActive=${
      Number(isActive) ? 1 : 0
    } where id = CONVERT(uniqueidentifier,'${useId}')`
  );
}

async function getUnits() {
  const result = await sql.query(`Select [name] , [code] from units`);
  return result.recordset;
}

async function updateUserInformation(id, name, email, roll, unit, isActive) {
  await sql.query(
    `update users set name = '${name}',email='${email}' ,roll='${roll}',unitId='${unit}', isActive=${isActive} where id = CONVERT(uniqueidentifier,'${id}')`
  );
  return;
}

async function addUserService(name, email, password, roll, unit, isActive) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(password, salt);
  await sql.query(`INSERT INTO users(name,email,[password],roll,isActive, unitId)
  VALUES ('${name}', '${email}','${pass}','${roll}',${isActive},'${unit}')`);
  return;
}

async function changePasswordService(id, newPass) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(newPass, salt);
  await sql.query(
    `update users set password='${pass}' where id = CONVERT(uniqueidentifier,'${id}')`
  );
  return;
}

module.exports = {
  getUserByEmail,
  changeActive,
  getUserById,
  getUnits,
  updateUserInformation,
  changePasswordService,
  addUserService,
};
