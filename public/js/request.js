console.log($("#completed-checkbox"));
$("input#completed-checkbox").change(function (event) {
  const isChecked = event.target.checked;
  const id = event.target.getAttribute("data-id");
  $.ajax({
    url: "/request/check",
    type: "PUT",
    data: {
      isChecked: isChecked ? 1 : 0,
      request: id,
    },
    success: function (response) {
      console.log(response);
    },
  });
});
