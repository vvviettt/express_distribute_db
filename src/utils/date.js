function convertDateTimeToDateSQL(date) {
  // Create a new Date object using the original date string
  const originalDate = new Date(date);

  // Trích xuất thông tin ngày, tháng, năm, giờ và phút từ đối tượng Date gốc
  const year = originalDate.getFullYear(); // Lấy năm
  const month = originalDate.getMonth() + 1; // Lấy tháng
  const day = originalDate.getDate(); // Lấy ngày
  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();
  const seconds = originalDate.getSeconds();

  // Tạo một đối tượng Date mới từ thông tin đã trích xuất
  const convertedDate = new Date(year, month - 1, day, hours, minutes, seconds);

  // Định dạng ngày mới thành 'YYYY-MM-DD hh:mm:ss.SSS'
  const formattedConvertedDate = `${convertedDate.getFullYear()}-${(
    convertedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${convertedDate
    .getDate()
    .toString()
    .padStart(2, "0")} ${convertedDate
    .getHours()
    .toString()
    .padStart(2, "0")}:${convertedDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${convertedDate
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${convertedDate
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;

  // Output the converted date
  return formattedConvertedDate; // Output: '2023-11-22 07:30:00.000'
}

module.exports = { convertDateTimeToDateSQL };
