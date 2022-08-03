var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
  document.getElementById("print-greeting").innerHTML = "Morning "
} else if (curHr < 18) {
  document.getElementById("print-greeting").innerHTML = "Afternoon "
} else {
  document.getElementById("print-greeting").innerHTML = "Evening "
}
$.get('https://apollo.leedslab.uk/cdn-cgi/access/get-identity?format=json', function(data) {
  console.log(data);
  
email = (data.email)
var i = 0;
var speed = 50;
 function typeWriter() {
  if (i < email.length) {
    document.getElementById("login").value += email.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
  
 name = (data.name)
 nameif = name.includes(",");

 if (nameif === true) {
  let text = (data.name);
  const myArray = text.split(",");
  document.getElementById("print-first-name").innerHTML = myArray[2];
} else {
  let text = (data.name);
  const myArray = text.split(" ");
  document.getElementById("print-first-name").innerHTML = myArray[0];
  typeWriter()
}



document.getElementById("name-print").innerHTML = name;
document.getElementById("email-print").innerHTML = email;
document.getElementById("ip-print").innerHTML = ip;


  
});
