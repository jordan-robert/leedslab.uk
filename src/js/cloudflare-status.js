var timeleft = 13;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = 10 - timeleft;
  timeleft -= 1;
}, 1000);
document.getElementById("cloudflare-fail-status").innerHTML = "Testing Connectivity to Lab Servers...."; 
function imageFound() {
    document.getElementById("cloudflare-fail-status").style.display='none';
    document.getElementById("progressBar").style.display='none';
    document.getElementById("cloudflare-status").innerHTML = "Cloudflare Tunnel Online"; 
}

function imageNotFound() {
     document.getElementById("progressBar").style.display='none';
     document.getElementById("cloudflare-fail-status").innerHTML = "Cloudflare Tunnel Offline! (All VMs will be down, as they connect to this!)";
     document.getElementById("cloudflare-fail-banner").innerHTML = "Cloudflare Tunnel Offline > Click for details";
     location.href = "#popup1";
}
var apollo = "https://zta-cloudflare-con.leedslab.uk/ap/";
var ram = Math.floor(Math.random()* 2000);
var svg = ".svg";
var url = apollo + ram + svg;
ServerTest(url);
