export const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    // day: "numeric",
    year: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  })
}
export const formattedFullDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    // hour: "numeric",
    // minute: "numeric",
  })
}

export const toDays = function(date1,date2) {
  // console.log(date1,date2)
  if(!date1 || !date2) return 0;
  var oneDay = 24 * 60 * 60 * 1000;
  
  var date1InMillis = date1.getTime();
  var date2InMillis = date2.getTime();
  var days = Math.round((date2InMillis - date1InMillis) / oneDay);
  return days <= 0 ? 0 : days;
}