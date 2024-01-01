$(".status").on("change", function (event) {
  const isChecked = event.target.checked;
  const id = event.target.getAttribute("data-id");
  $.ajax({
    url: "class/active",
    type: "PATCH",
    data: {
      isChecked: isChecked ? 1 : 0,
      classId: id,
    },
    success: function (response) {
      console.log(response);
    },
  });
});
