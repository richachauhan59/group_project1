var tempdate=new Date();
var ourdate=tempdate.getDate();
var ourmonth=tempdate.getMonth();
var ouryear=tempdate.getFullYear();
var date=document.getElementById("date");
date.value=ouryear.toString()+"-"+ourmonth.toString()+"-"+ourdate.toString();
var global=JSON.parse(localStorage.getItem("global"));
var current=JSON.parse(localStorage.getItem("current"));
var divnameid=document.getElementById("divname");
divnameid.textContent=global[current]['name'];
var currentuser=global[current]
var expensesubmit=document.getElementById("expensesubmit");
expensesubmit.addEventListener("click",addexpense);
var incomesubmit=document.getElementById("incomesubmit");
incomesubmit.addEventListener("click",addincome);
var budgetsubmit=document.getElementById("budgetsubmit");
budgetsubmit.addEventListener("click",addbudget);
var datesubmit=document.getElementById("date");
datesubmit.addEventListener("click",datewise);
var logout=document.getElementById("logout");
logout.addEventListener("click",exit);
function exit(){
    window.location.href("index.html");
}
function datewise(){
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(!(year in currentuser){
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        var div1=document.createElement("div");
        div1.style.color="red";
        div1.textContent="No Records found for the given year & month";
        maindiv.append(div1);
    }
    else if(!(month in currentuser[year])){
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        var div1=document.createElement("div");
        div1.style.color="red";
        div1.textContent="No Records found for the given year & month";
        maindiv.append(div1);
    }
    else{
        var summary=currentuser[year][month]["summary"];
        var income=currentuser[year][month]["income"];
        var budget=currentuser[year][month]["budget"];
        var expense=currentuser[year][month]["expense"];
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
            divsavings.textContent="You are saving"+(income-expense);
        }
        else{
            divsavings.style.color="red";
            divsavings.textContent="You are not saving and have loan of"+(expense-income);
        }
        if(budget>=expense){
            divlimit.style.color="green";
            divlimit.textContent="You are spending within limit! So expect good savings so plus amount is"+(budget-expense);
        }
        else{
            divlimit.style.color="red";
            divlimit.textContent="You are not spending within limit! So dont expect savings so overlimit amount is"+(budget-expense);
        }
        divincome.textContent="Total income this month"+income;
        divbudget.textContent="Budget You set for this month is"+budget;
        divexpense.textContent="So expenses till now is"+expense;
        var monthdiv=document.createElement("div");
        monthdiv.textContent="Details for month:"+month+"& year:"+year;
        var maindiv=document.getElementById("maindiv");
        maindiv.textContent="";
        maindiv.append(monthdiv,divincome,divexpense,divbudget,divsavings,divlimit,summarydiv);
        localStorage.setItem("global",JSON.stringify(global));
    }

}
function addexpense(){
    var item=document.getElementById("expenseitem");
    var amount=document.getElementById("expenseamount");
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(year in currentuser){
        if(month in currentuser[year]){
            currentuser[year][month]["summary"].push(date+" "+item+" "+amount+" EXPENSE");
            currentuser[year][month]["expense"]+=amount;
        }
        else{
            var summary=[date+" "+item+" "+amount+" EXPENSE"];
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
        var summary=[date+" "+item+" "+amount+" EXPENSE"];
        var expense=amount;
        var budget=0;
        var income=0;
        var date1={}
        date1["summary"]=summary;
        date1["expense"]=expense;
        date1["budget"]=budget;
        date1["income"]=income;
        var year1={}
        year1[year]=date1;
        currentuser[year]=year1;
    }
    datewise();
}
function addincome(){
    var item=document.getElementById("incomeitem");
    var amount=document.getElementById("incomeamount");
    var date=document.getElementById("date").value;
    var datearray=date.split("-");
    var year=datearray[0];
    var month=datearray[1];
    if(year in currentuser){
        if(month in currentuser[year]){
            currentuser[year][month]["summary"].push(date+" "+item+" "+amount+" INCOME");
            currentuser[year][month]["income"]+=amount;
        }
        else{
            var summary=[date+" "+item+" "+amount+" INCOME"];
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
        var summary=[date+" "+item+" "+amount+" INCOME"];
        var expense=0;
        var budget=0;
        var income=amount;
        var date1={}
        date1["summary"]=summary;
        date1["expense"]=expense;
        date1["budget"]=budget;
        date1["savings"]=savings;
        date1["income"]=income;
        var year1={}
        year1[year]=date1;
        currentuser[year]=year1;
    }
    datewise();
}
function addbudget(){
    var amount=document.getElementById("budgetamount").value;
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
        var year1={}
        year1[year]=date1;
        currentuser[year]=year1;
    }
    datewise();
}
datewise();