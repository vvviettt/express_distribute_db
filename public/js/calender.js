// var events = { events };
console.log(events);
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "timeGridWeek",
    headerToolbar: {
      left: "",
      center: "title",
    },
    allDaySlot: false,
    events: [...events],
  });
  calendar.render();
});
