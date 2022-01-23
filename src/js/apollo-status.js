function imageFound() {
    document.getElementById("apollo-status").innerHTML = "Apollo Online";
    document.getElementById("apollo-status-banner").innerHTML = "Apollo Online"; 
}

function imageNotFound() {
     document.getElementById("apollo-fail-status").innerHTML = "Apollo Offline"; 
     document.getElementById("apollo-fail-banner").innerHTML = "Apollo EVE Server Offline > Click for details";
     location.href = "#popup1";

	 
}

var apollo = "https://acon.leedslab.uk/themes/adminLTE/connectivity/ap/";
var ram = Math.floor(Math.random()* 2000);
var svg = ".svg";
var url = apollo + ram + svg;

ServerTest(url);

