$.get('https://start.leedslab.uk/cdn-cgi/access/get-identity?format=json', function(data) {
  console.log(data);
name = (data.name)
name.toString
nameif = name.includes(",");
document.getElementById("name-print").innerHTML = (data.name);
document.getElementById("email-print").innerHTML = (data.email);
document.getElementById("ip-print").innerHTML = (data.ip);

if (nameif === true) {
  let text = (data.name);
  const myArray = text.split(",");
  document.getElementById("name1").innerHTML = myArray[2];
} else {
  let text = (data.name);
  const myArray = text.split(" ");
  document.getElementById("name1").innerHTML = myArray[0];
}

  
        $("#gfg").html(data.name);
});
