var timeleft = 13;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
  }
  document.getElementById("progressBar").value = 10 - timeleft;
  timeleft -= 1;
}, 1000);
document.getElementById("kemp-fail-status").innerHTML = "Testing Connectivity to Lab Servers...."; 
function imageFound() {
    document.getElementById("kemp-fail-status").style.display='none';
    document.getElementById("progressBar").style.display='none';
    document.getElementById("kemp-status").innerHTML = "Kemp LB Online"; 
}

function imageNotFound() {
     document.getElementById("progressBar").style.display='none';
     document.getElementById("kemp-fail-status").innerHTML = "Core LoadBalancer Offline! (All VMs will be down, as they connect to this!)";
     document.getElementById("kemp-fail-banner").innerHTML = "Kemp Server Offline > Click for details";
     location.href = "#popup1";
}

ServerTest("https://zcon.leedslab.uk/lm_auth_proxy?LMimage=con-test.png");
