document.getElementById("kemp-fail-status").innerHTML = "Testing Connectivity to Lab Servers...."; 
function imageFound() {
    document.getElementById("kemp-status").innerHTML = "Kemp LB Online"; 
}

function imageNotFound() {
     document.getElementById("kemp-fail-status").innerHTML = "KEMP Offline! (All VMs will be down, as they connect to this!)"; 
     document.getElementById("kemp-fail-banner").innerHTML = "Kemp Server Offline > Click for details";
     location.href = "#popup1";
}

ServerTest("https://zcon.leedslab.uk/lm_auth_proxy?LMimage=con-test.png");
