document.getElementById("zeus-fail-status").innerHTML = "Please Wait..."; 
var zeus = "https://zcon.leedslab.uk/themes/adminLTE/connectivity/";
var ram = Math.floor(Math.random()* 2000);
var svg = ".svg";
var url = zeus + ram + svg;

function ServerTest(url) {
    var tester=new Image();
    tester.onload=imageFound;
    tester.onerror=imageNotFound;
    tester.src=url;
}

function imageFound() {
    document.getElementById("zeus-status").innerHTML = "Zeus Online"; 
}

function imageNotFound() {
     document.getElementById("zeus-fail-status").innerHTML = "Zeus Offline!";
     document.getElementById("zeus-fail-banner").innerHTML = "Zeus EVE Server Offline > Click for details";
     location.href = "#popup1";
}

ServerTest(url);
