var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  document.getElementById("print-greeting").innerHTML = "Morning "
} else if (curHr < 18) {
  document.getElementById("print-greeting").innerHTML = "Afternoon "
} else {
  document.getElementById("print-greeting").innerHTML = "Evening "
}
$.get('https://zta-zeus.leedslab.uk/cdn-cgi/access/get-identity?format=json', function(data) {
  console.log(data);
  
 name = (data.name)
 nameif = name.includes(",");
 email = (data.email)
 if (nameif === true) {
  let text = (data.name);
  const myArray = text.split(",");
  document.getElementById("print-first-name").innerHTML = myArray[2];
} else {
  let text = (data.name);
  const myArray = text.split(" ");
  document.getElementById("print-first-name").innerHTML = myArray[0];
  document.getElementById("login").value = email;
}



document.getElementById("name-print").innerHTML = name;
document.getElementById("email-print").innerHTML = email;
document.getElementById("ip-print").innerHTML = ip;


  
});
