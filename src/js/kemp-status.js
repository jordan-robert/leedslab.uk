function imageFound() {
    document.getElementById("kemp-status").innerHTML = "Kemp LB Online"; 
}

function imageNotFound() {
     document.getElementById("kemp-fail-status").innerHTML = "KEMP Offline!"; 
	 alert("The main load balancer (KEMP) is not reachable from your PC. Because of this, both servers will be offline. This is normally a WAN or server issue and should be sorted soon, sorry!") 
}

ServerTest("https://kemp.leedslab.uk/lm_auth_proxy?LMimage=con-test.png");