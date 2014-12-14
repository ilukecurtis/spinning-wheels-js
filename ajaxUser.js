///////////////////////////////LUKE CURTIS INTERACTIVE WEB PROGRAMMING ASSIGNMENT 2/////////////////////////////////////
/////////////////PLEASE SEE EXTJS.JS FOR ADDITIONAL CODE RELATING TO UPDATING BETWEEN INVOCATIONS///////////////////////
//AS IT CURRENTLY STANDS, ALL REQUIREMENTS OF THE ASSIGNMENT HAVE BEEN MET IN ajaxUser.js, extjs.js and responseLogin.php
//Passwords for all accounts are currently password. Test accounts have been utilised, no prizes are redeemed on load until collection made
var userName=""; 
var password="";
var curTok="";
var curWin = "";
var ajaxReq = null;
var ajaxEnd = null;
var ajaxHigh = null;
function AJAXLogin(){
	userName = document.getElementById("username").value;
	password = document.getElementById("password").value;
	curWin = parseInt(document.getElementById("win").innerHTML);
	ajaxReq = makeHttpReq(); //polymorphic function to make an activeXreq/httpreq depending on browser
	ajaxReq.onreadystatechange = function (){
										if (ajaxReq.readyState == 4) { //make sure server done processing request
											if (ajaxReq.responseText != "-5"){ //make sure request did not have error
												document.getElementById("responses").innerHTML =("Logged in as <div id='name'>" + userName + "</div>");
												var ajaxResponses = ajaxReq.responseText;
												var ajaxSplit = ajaxResponses.split('/'); //response from PHP is split by a /
												curTok = ajaxSplit[0];
												curWin = ajaxSplit[1];
												document.getElementById("tok").innerHTML = curTok;
												document.getElementById("win").innerHTML = curWin;
												document.getElementById("username").value = "";
												document.getElementById("password").value = "";
												document.getElementById("login").style.visibility='hidden';
												document.getElementById("register").style.visibility='hidden';
											}
											else {
											document.getElementById("responses").innerHTML = ("Incorrect credentials");
											document.getElementById("login").style.visibility='visible';
											document.getElementById("register").style.visibility='hidden';
											}	
										}
														
	} 
	var url="php/responseLogin.php?function=logCheck&userName=" + userName + "&password=" + password;
	//the url contains variables FUNCTION which is logCheck, username and password
	// it then checks the php file if what was passed over was in fact logCheck
	ajaxReq.open("GET", url, true);
	ajaxReq.send();
	
}
function AJAXLogout(){ //Saves and logs the user out, it also saves everytime you click play, pay or collect, but this way allows for going between users
	curTok = parseInt(document.getElementById("tok").innerHTML);
	curWin = parseInt(document.getElementById("win").innerHTML);
	totalScore = curTok + curWin;
	user = userName;
	ajaxEnd = makeHttpReq(); //still need to save current winnings here, also prizes redeemed
	ajaxEnd.onreadystatechange=function (){
										if (ajaxEnd.readyState == 4) { //make sure server done processing request
											if (ajaxEnd.responseText != "10"){ //make sure request did not have error
												document.getElementById("responses").innerHTML = ("Error logging out");
											}
											else {
												document.getElementById("responses").innerHTML =("Successfully logged out! (Now playing as guest)");
												document.getElementById("tok").innerHTML = ajaxEnd.responseText;
												document.getElementById("username").value = "";
												document.getElementById("password").value = "";
												document.getElementById("sess").innerHTML = ("0");
												document.getElementById("win").innerHTML = ("0");
												document.getElementById("login").style.visibility='visible';
												document.getElementById("register").style.visibility='visible';
												
											}	
										}
	
	}
	var url="php/responseLogin.php?function=logout&tok=" + curTok + "&username=" + user + "&winnings=" + curWin + "&totalScore=" + totalScore;
	ajaxEnd.open("GET", url, true);
	ajaxEnd.send();
}
function AJAXRegister(){
	var tokStore;
	userName = document.getElementById("usernameLog").value;
	password = document.getElementById("passwordLog").value;
	tokStore = parseInt(document.getElementById("tok").innerHTML);
	curWin = parseInt(document.getElementById("win").innerHTML);
	totalScore = tokStore + curWin; //gets all these variables to then send over and store the user in the database
	var ajaxReg= makeHttpReq();
	ajaxReg.onreadystatechange=function(){
											if (ajaxReg.readyState == 4) {
													if (ajaxReg.responseText == "-1") {
													document.getElementById("responses").innerHTML = ("Username taken");
													document.getElementById("login").style.visibility='visible';
													document.getElementById("register").style.visibility='visible';
													}
													else {
													document.getElementById("responses").innerHTML = ('Registered under the username, <div id="name">' + userName + '</div>Nice one. You are now logged in, lets play!');
													document.getElementById("usernameLog").value = "";//a session is set to say they are logged in, so their score is saved no matter what happens from here on out until they logout
													document.getElementById("passwordLog").value = "";
													document.getElementById("login").style.visibility='hidden';
													document.getElementById("register").style.visibility='hidden';
													}
											}
	
	}
	var url="php/responseLogin.php?function=registerUser&user=" + userName + "&password=" + password + "&tokens=" + tokStore + "&winnings=" + curWin + "&totalScore=" + totalScore;
	ajaxReg.open("GET", url, true);
	ajaxReg.send();
}
function makeHttpReq(){
	var httpRequest = null; //temp variable to send back, polymorphic function

			if(window.ActiveXObject){
				//check if the window is legacy like IE5,6
				try{
					httpRequest = new ActiveXObject("microsoft.XMLHTTP");
				}catch (err){
					try{
						httpRequest = new ActiveXObject("Msxm12.XMLHTTP");
					}catch (err){
						alert ("Did you access this from a potato? Seriously, I'm surprised you made it this far!");
					}
				}
			}else if(window.XMLHttpRequest){
				//check if it can support xmlhttp, eg chrome firefox, IE7+ etc
				try{
					httpRequest = new XMLHttpRequest();
				}catch (err){
					alert ("Error making a request to use. Try a different browser!");
				}
			}

			return httpRequest;
}
function showHighscores(){
	ajaxHigh = makeHttpReq();
	ajaxHigh.onreadystatechange=function (){
										if (ajaxHigh.readyState == 4) { //make sure server done processing request
											document.getElementById("responses").innerHTML = ajaxHigh.responseText;
										}
	
	}
	var url="php/responseLogin.php?function=showHiscores";
	ajaxHigh.open("GET", url, true);
	ajaxHigh.send();
}
function showPrizes(){
	ajaxPrize = makeHttpReq();
	ajaxPrize.onreadystatechange=function() {
									if (ajaxPrize.readyState == 4) {
										document.getElementById("responses").innerHTML = ajaxPrize.responseText;
									}
								}
	var url="php/responseLogin.php?function=showPrizes";
	ajaxPrize.open("GET", url, true);
	ajaxPrize.send();
}