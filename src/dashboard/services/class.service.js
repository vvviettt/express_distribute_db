const mssql = require("mssql");

async function getClasses() {
  const classes =
    await mssql.query(`SELECT classes.id,classes.isActive, classes.name,departments.id as departmentId, departments.name as departmentName, departments.unitId FROM classes 
    LEFT JOIN departments ON classes.departmentId = departments.id`);
  return classes.recordset;
}

async function activeClass(isActive, classId) {
  return await mssql.query(`
        UPDATE classes SET classes.isActive = ${
          !!isActive ? 1 : 0
        } WHERE classes.id = '${classId}'
    `);
}

async function getAllDepartment() {
  const res = await mssql.query(`
  SELECT departments.id, departments.name, departments.unitId  FROM departments;
  `);
  return res.recordset;
}

async function addClass(data) {
  const { departmentId, name, isChecked } = data;
  if (!departmentId || !name) {
    throw new Error("Validation error");
  }
  await mssql.query(`
      INSERT INTO classes(name, departmentId, isActive)
      VALUES ('${name}', '${departmentId}', ${!!isChecked ? 1 : 0});
    `);
  return;
}

module.exports = { getClasses, activeClass, getAllDepartment, addClass };
