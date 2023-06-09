Handlebars.registerHelper("formatTime", function (isoString) {
  const utcTime = moment.utc(isoString);
  return utcTime.tz("America/New_York").format("LLLL");
});

$(function () {
  var url =
    "https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/events.json";
  $.getJSON(url, function (data) {
    var template = Handlebars.compile($("#template").html());
    $("#content").html(template({ people: data["data"] }));
  });
});
