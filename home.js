var tempdate=new Date();
var ourdate=tempdate.getDate();
var ourmonth=tempdate.getMonth()+1;
var ouryear=tempdate.getFullYear();
console.log(tempdate)
var date=document.getElementById("date");
console.log(date.value);
if(ourmonth<10){
    ourmonth="0"+ourmonth.toString();
}
if(ourdate<10){
    ourdate="0"+ourdate.toString();
}
date.value=ouryear.toString()+"-"+ourmonth.toString()+"-"+ourdate.toString();
console.log(date.value)
var global=JSON.parse(localStorage.getItem("global"));
var current=JSON.parse(localStorage.getItem("current"));
var currentuser=global[current];
var expensesubmit=document.getElementById("expensesubmit");
expensesubmit.addEventListener("click",addexpense);
var incomesubmit=document.getElementById("incomesubmit");
incomesubmit.addEventListener("click",addincome);
var budgetsubmit=document.getElementById("budgetsubmit");
budgetsubmit.addEventListener("click",addbudget);
var datesubmit=document.getElementById("datesubmit");
datesubmit.addEventListener("click",datenew);
var logout=document.getElementById("logout");
logout.addEventListener("click",exit);
function exit(e){
    e.preventDefault();
    window.location.href="index.html";
}
function datenew(e){
    e.preventDefault();
    datewise();
}
function datewise(){
    var i1=document.createElement("i")
    var i2=document.createElement("i")
    var i3=document.createElement("i")
    var i4=document.createElement("i")
    var i5=document.createElement("i")
    var i6=document.createElement("i")
    var i7=document.createElement("i")
    i1.setAttribute("class","fas fa-money-bill-wave");
    i2.setAttribute("class","fas fa-money-check");
    i3.setAttribute("class","fas fa-wallet");
    i4.setAttribute("class","fas fa-dollar-sign");
    i5.setAttribute("class","fas fa-rupee-sign");
    i6.setAttribute("class","fas fa-hand-holding-usd");
    i7.setAttribute("class","fas fa-file-invoice-dollar");
    i1.style="font-size:60px;color:red;"
    i2.style="font-size:60px;color:green;"
    i3.style="font-size:60px;color:indigo;"
    i4.style="font-size:60px;color:cyan;"
    i5.style="font-size:60px;color:skyblue;"
    i6.style="font-size:60px;color:orange;"
    i7.style="font-size:60px;color:grey;"
    var idiv1=document.createElement("div");
    var idiv2=document.createElement("div");
    var idiv3=document.createElement("div");
    var idiv4=document.createElement("div");
    var idiv5=document.createElement("div");
    var idiv6=document.createElement("div");
    var idiv7=document.createElement("div");
    idiv1.append(i1);
    idiv2.append(i2);
    idiv3.append(i3);
    idiv4.append(i4);
    idiv5.append(i5);
    idiv6.append(i6);
    idiv7.append(i7);

    var date1=document.getElementById("date").value;
    var datearray=date1.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(!(year in currentuser)){
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        var div1=document.createElement("div");
        div1.style.color="red";
        div1.textContent="No Records found for the given year & month";
        var divname=document.createElement("div");
        divname.textContent="Welcome :"+currentuser["name"];
        maindiv.append(divname,div1);
    }
    else if(!(month in currentuser[year])){
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        var div1=document.createElement("div");
        div1.style.color="red";
        div1.textContent="No Records found for the given year & month";
        var divname=document.createElement("div");
        divname.textContent="Welcome :"+currentuser["name"];
        maindiv.append(divname,div1);
    }
    else{
        var summary=currentuser[year][month]["summary"];
        var income=currentuser[year][month]["income"];
        var budget=currentuser[year][month]["budget"];
        var expense=currentuser[year][month]["expense"];
        var divname=document.createElement("div");
        divname.textContent="Welcome :"+currentuser["name"];
        var summarydiv=document.createElement("div");
        summarydiv.textContent="SUMMARY";
        var br=document.createElement("br");
        summarydiv.append(br);
        for(var i=0;i<summary.length;i++){
            var divsum=document.createElement("div");
            divsum.textContent=summary[i];
            summarydiv.append(divsum);
        }
        var divincome=document.createElement("div");
        var divbudget=document.createElement("div");
        var divexpense=document.createElement("div");
        var divsavings=document.createElement("div");
        var divlimit=document.createElement("div");
        if(income>=expense){
            divsavings.style.color="green";
            divsavings.textContent="SAVINGS "+(income-expense);
        }
        else{
            divsavings.style.color="red";
            divsavings.textContent="DEBT "+(expense-income);
        }
        if(budget>=expense){
            divlimit.style.color="green";
            divlimit.textContent="INLIMIT "+(budget-expense);
        }
        else{
            divlimit.style.color="red";
            divlimit.textContent="OVERLIMIT "+(budget-expense);
        }
        divincome.textContent="INCOME "+income;
        divbudget.textContent="BUDGET "+budget;
        divexpense.textContent="EXPENSES "+expense;
        var monthdiv=document.createElement("div");
        monthdiv.textContent="MONTH: "+month+" YEAR: "+year;
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        divname.style.float="left";
        idiv7.style.float="left";
        monthdiv.style.float="left";
        idiv1.style.float="left";
        divincome.style.float="left";
        idiv2.style.float="left";
        divexpense.style.float="left";
        idiv3.style.float="left";
        divbudget.style.float="left";
        idiv4.style.float="left";
        divsavings.style.float="left";
        idiv5.style.float="left";
        divlimit.style.float="left";
        idiv6.style.float="left";
        summarydiv.style.marginTop="50px";
        var tempdiv=document.createElement("div");
        tempdiv.textContent="DETAILS"
        maindiv.append(divname,idiv7,monthdiv,idiv1,divincome,idiv2,divexpense,idiv3,divbudget,idiv4,divsavings,idiv5,divlimit,idiv6,tempdiv,summarydiv);
        localStorage.setItem("global",JSON.stringify(global));
    }

}
function addexpense(e){
    e.preventDefault()
    var item=document.getElementById("expenseitem").value;
    var amount=Number(document.getElementById("expenseamount").value);
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(year in currentuser){
        if(month in currentuser[year]){
            currentuser[year][month]["summary"].push(date+" "+item+" "+amount.toString()+" EXPENSE");
            currentuser[year][month]["expense"]+=amount;
        }
        else{
            var summary=[date+" "+item+" "+amount.toString()+" EXPENSE"];
            var expense=amount;
            var budget=0;
            var income=0;
            var date1={}
            date1["summary"]=summary;
            date1["expense"]=expense;
            date1["budget"]=budget;
            date1["income"]=income;
            currentuser[year][month]=date1;
        }
    }
    else{
        var summary=[date+" "+item+" "+amount.toString()+" EXPENSE"];
        var expense=amount;
        var budget=0;
        var income=0;
        var date1={}
        date1["summary"]=summary;
        date1["expense"]=expense;
        date1["budget"]=budget;
        date1["income"]=income;
        var month1={}
        month1[month]=date1;
        currentuser[year]=month1;
    }
    
    datewise();
}
function addincome(e){
    e.preventDefault()
    var item=document.getElementById("incomeitem").value;
    var amount=Number(document.getElementById("incomeamount").value);
    console.log(item,amount);
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(year in currentuser){
        if(month in currentuser[year]){
            currentuser[year][month]["summary"].push(date+" "+item+" "+amount.toString()+" INCOME");
            currentuser[year][month]["income"]+=amount;
        }
        else{
            var summary=[date+" "+item+" "+amount.toString()+" INCOME"];
            var expense=0;
            var budget=0;
            var income=amount;
            var date1={}
            date1["summary"]=summary;
            date1["expense"]=expense;
            date1["budget"]=budget;
            date1["income"]=income;
            currentuser[year][month]=date1;
        }
    }
    else{
        var summary=[date+" "+item+" "+amount.toString()+" INCOME"];
        var expense=0;
        var budget=0;
        var income=amount;
        var date1={}
        date1["summary"]=summary;
        date1["expense"]=expense;
        date1["budget"]=budget;
        date1["income"]=income;
        var month1={}
        month1[month]=date1;
        currentuser[year]=month1;
    }
    console.log(currentuser);
    datewise();
}
function addbudget(e){
    e.preventDefault()
    var amount=Number(document.getElementById("budgetamount").value);
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(year in currentuser){
        if(month in currentuser[year]){
            currentuser[year][month]["budget"]=amount;
        }
        else{
            var summary=[];
            var expense=0;
            var budget=amount;
            var income=0;
            var date1={}
            date1["summary"]=summary;
            date1["expense"]=expense;
            date1["budget"]=budget;
            date1["income"]=income;
            currentuser[year][month]=date1;
        }
    }
    else{
        var summary=[];
        var expense=0;
        var budget=amount;
        var income=0;
        var date1={}
        date1["summary"]=summary;
        date1["expense"]=expense;
        date1["budget"]=budget;
        date1["income"]=income;
        var month1={}
        month1[month]=date1;
        currentuser[year]=month1;
    }
    datewise();
}
datewise();