var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  document.getElementById("print-greeting").innerHTML = "Morning, "
} else if (curHr < 18) {
  document.getElementById("print-greeting").innerHTML = "Afternoon, "
} else {
  document.getElementById("print-greeting").innerHTML = "Evening, "
}
$.get('https://start.leedslab.uk/cdn-cgi/access/get-identity?format=json', function(data) {
  console.log(data);
name = (data.name)
email = (data.email)
ip = (data.ip)
name.toString
nameif = name.includes(",");
document.getElementById("name-print").innerHTML = name;
document.getElementById("email-print").innerHTML = email;
document.getElementById("ip-print").innerHTML = ip;

if (nameif === true) {
  let text = (data.name);
  const myArray = text.split(",");
  document.getElementById("print-name").innerHTML = myArray[2];
} else {
  let text = (data.name);
  const myArray = text.split(" ");
  document.getElementById("print-name").innerHTML = myArray[0];
}

  
        $("#gfg").html(data.name);
});
