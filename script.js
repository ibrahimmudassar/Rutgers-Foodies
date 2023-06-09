var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);

let url =
  "https://raw.githubusercontent.com/ibrahimmudassar/Rutgers-Foodies/main/events.json";
fetch(url)
  .then((res) => res.json())
  .then((out) => console.log("Checkout this JSON! ", out))
  .catch((err) => {
    throw err;
  });
console.log(context);
var html = template(context);
document.getElementById("out").innerHTML = html;
