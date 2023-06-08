var context;
function doStuff(data) {
  context = data["data"].slice(1, data["data"].length - 1);
  console.log(context);
}

var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

let url =
  "https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/events.csv";
Papa.parse(url, {
  download: true,
  complete: doStuff,
});
console.log(context);
var html = template(context);
document.getElementById("out").innerHTML = html;
