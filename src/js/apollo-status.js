function imageFound() {
    document.getElementById("apollo-status").innerHTML = "Apollo Online"; 
}

function imageNotFound() {
     document.getElementById("apollo-fail-status").innerHTML = "Apollo Offline"; 
	 
}

var apollo = "https://apollo.leedslab.uk/themes/adminLTE/connectivity/";
var ram = Math.floor(Math.random()* 2000);
var svg = ".svg";
var url = apollo + ram + svg;

ServerTest(url);
