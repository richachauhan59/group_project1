var global=JSON.parse(localStorage.getItem("global"));
if(global==null){
    var a={}
    localStorage.setItem("global",JSON.stringify(a))
}

var loginsubmit=document.getElementById("loginsubmit");
loginsubmit.addEventListener("click",check)
function check(e){
    e.preventDefault();
    var global1=JSON.parse(localStorage.getItem("global"));
    console.log(global1);
    var loginemailid=document.getElementById("loginemailid").value;
    var loginpassword=document.getElementById("loginpassword").value;
    console.log(loginemailid,loginpassword)
    var divid=document.getElementById("divid1");
    if(!(loginemailid in global1)){
        divid.style.color="red";
        divid.textContent="Hey! Register First! or Emailid Incorrect!";
    }
    else if(loginpassword!=global1[loginemailid]['password']){
        divid.style.color="red";
        divid.textContent="Hey! Password Incorrect!";
    }
    else{
        divid.style.color="green";
        divid.textContent="Success!";
        setTimeout(() => {
            window.location.href="home.html";
        }, 3000);
        localStorage.setItem("current",JSON.stringify(loginemailid));
        
        
    }
}
var registersubmit=document.getElementById("registersubmit");
registersubmit.addEventListener("click",add);
function add(){
    var registeremailid=document.getElementById("registeremailid").value;
    var registerpassword=document.getElementById("registerpassword").value;
    var registerconfirmpassword=document.getElementById("registerconfirmpassword").value;
    var name=document.getElementById("name").value;
    var divid=document.getElementById("divid1");
    if(registerpassword!=registerconfirmpassword){
        divid.style.color="red";
        divid.textContent="Hey! Password and Confirm Password does not match";
    }
    else{
        divid.style.color="green";
        divid.textContent="Registered Successfully Please login!";
        var temp={};
        temp['password']=registerconfirmpassword;
        temp['name']=name;
        global[registeremailid]=temp;
        localStorage.setItem("global",JSON.stringify(global))

    }
}