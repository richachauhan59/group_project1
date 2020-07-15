var tempdate=new Date();
var ourdate=tempdate.getDate();
var ourmonth=tempdate.getMonth();
var ouryear=tempdate.getFullYear();
var date=document.getElementById("date");
date.value=ouryear.toString()+"-"+ourmonth.toString()+"-"+ourdate.toString();
