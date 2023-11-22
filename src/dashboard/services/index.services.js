const mssql = require("mssql");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone"); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

async function getEvents(userId) {
  const teach =
    await mssql.query(`SELECT subjectId, lessonNum,startAt,[subjects].[name] as subjectName,[classes].[name] as className from
   (SELECT * FROM user_teach 
   INNER JOIN teachingSchedule 
   ON [user_teach].[workId] = [teachingSchedule].[id] 
   AND  [user_teach].[userId] = '${userId}' ) rs1
   INNER JOIN subjects
   ON rs1.[subjectId] = subjects.[id] 
   INNER JOIN classes
   ON classes.[id] = [subjects].[classId]`);
  const work = await mssql.query(`SELECT * from  user_work 
    LEFT JOIN workingSchedule
    ON [user_work].[userId] = '${userId}'`);

  const teachEvents = teach.recordset.map((val) => {
    const date = dayjs.tz(val.startAt).utc();
    const endTime = date.add(60 * val.lessonNum, "minute");
    return {
      title: `Lịch dạy: ${val.subjectName} - ${val.className}`,
      start: date.format("YYYY-MM-DDTHH:mm:ss"),
      end: endTime.format("YYYY-MM-DDTHH:mm:ss"),
      backgroundColor: "#3788d8",
    };
  });
  const workEvents = work.recordset.map((val) => {
    const date = dayjs.tz(val.startAt).utc();
    const endTime = dayjs.tz(val.endAt).utc();
    return {
      title: val.desc,
      start: date.format("YYYY-MM-DDTHH:mm:ss"),
      end: endTime.format("YYYY-MM-DDTHH:mm:ss"),
      backgroundColor: "red",
    };
  });

  return [...teachEvents, ...workEvents];
}

module.exports = { getEvents };
