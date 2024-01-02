const mssql = require("mssql");
const { convertDateTimeToDateSQL } = require("../../utils/date");

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

async function getSubjectForClass() {
  const res =
    await mssql.query(`SELECT subjects.id, subjects.name, classes.name as className , units.code as unit from subjects
LEFT JOIN classes ON classes.id = subjects.classId
LEFT JOIN departments ON classes.departmentId = departments.id
LEFT JOIN units ON units.code = departments.unitId`);
  return res.recordset;
}

async function addSchedule(data) {
  const { type, subject, lessonNum, startAt, userId, endAt, desc } = data;
  console.log(data);
  if (type === "teaching" && !!subject && !!Number(lessonNum) && startAt) {
    const newTeaching = await mssql.query(`
      INSERT INTO teachingSchedule(subjectId, lessonNum, startAt)
      OUTPUT Inserted.ID
      VALUES ('${subject}', ${Number(lessonNum)},'${convertDateTimeToDateSQL(
      startAt
    )}')
    `);
    await mssql.query(`
    INSERT INTO user_teach(workId, userId)
    VALUES 
    ('${newTeaching.recordset[0].ID}', '${userId}')`);
    return;
    // console.log(convertDateTimeToDateSQL(startAt));
  } else if ((type === "meeting" && startAt, endAt)) {
    const newTeaching = await mssql.query(`
      INSERT INTO workingSchedule(startAt, endAt, [desc])
      OUTPUT Inserted.ID
      VALUES ('${convertDateTimeToDateSQL(
        startAt
      )}', '${convertDateTimeToDateSQL(endAt)}','${desc ?? ""}')
    `);
    await mssql.query(`
    INSERT INTO user_work(workId, userId)
    VALUES 
    ('${newTeaching.recordset[0].ID}', '${userId}')`);
    return;
  }
  throw new Error("Validation error");
  // await mssql.query(`
  //     INSERT INTO classes(name, departmentId, isActive)
  //     VALUES ('${name}', '${departmentId}', ${!!isChecked ? 1 : 0});
  //   `);
  return;
}

module.exports = {
  getClasses,
  getSubjectForClass,
  activeClass,
  getAllDepartment,
  addClass,
  addSchedule,
};
