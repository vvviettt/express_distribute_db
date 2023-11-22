$(".status").on("change", function (event) {
  const isChecked = event.target.checked;
  const id = event.target.getAttribute("data-id");
  $.ajax({
    url: "/user/active",
    type: "PUT",
    data: {
      isChecked: isChecked ? 1 : 0,
      userId: id,
    },
    success: function (response) {
      console.log(response);
    },
  });
});
