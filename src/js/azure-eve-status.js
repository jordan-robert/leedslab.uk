function ServerTest(url) {
    var tester=new Image();
    tester.onload=imageFound;
    tester.onerror=imageNotFound;
    tester.src=url;
}

var today = new Date();
var time = today.getHours()

if (time < 7) {
  Shutdownstate = "Morning, you're too early, Azure EVE will be online at 07:00AM!";
    } else if (time = 19) {
  Shutdownstate = "Azure EVE has shutdown for the night and will be back at 07:00AM, have a good evening!";
} else if (time > 19) {
  Shutdownstate = "Azure EVE has shutdown for the night and will be back at 07:00AM, have a good evening!";
} else {
  function imageFound() {
    document.getElementById("azure-status").innerHTML = "Azure EVE Online";
  }
function imageNotFound() {
     document.getElementById("azure-fail-status").innerHTML = "Azure EVE Offline"; 
     location.href = "#popup1";
}

var apollo = "https://azurelab.leedslab.uk/themes/adminLTE/connectivity/aeve/";
var ram = Math.floor(Math.random()* 2000);
var svg = ".svg";
var url = apollo + ram + svg;

ServerTest(url);
  
}
document.getElementById("azure-shutdown").innerHTML = Shutdownstate;
