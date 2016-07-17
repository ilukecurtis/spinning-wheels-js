<?php  
session_start(); //Notes on js files, use create.php to reset database.
	?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<link rel="stylesheet" type="text/css" href="styles.css">

<script type="text/javascript" src="extjs.js"></script>
<script type="text/javascript" src="ajaxUser.js"></script>
</head>

<body>

<div id="wrapper">

<div id="banner"></div>
<div id="assignment2">
<div id="login">
<p> Login: TEST</p>
		<input name="username" type="text" id="username">
		<input name="password" type="password" id="password">
		<input type="submit" name="Submit" value="Login" onclick="AJAXLogin()">
</div>
<div id="register">
<p> Register: </p>
		<input name="usernameLog" type="text" id="usernameLog">
		<input name="passwordLog" type="password" id="passwordLog"><br>
		<input type="submit" name="Submit" value="Register" onclick="AJAXRegister()">
</div>
		<input type="submit" name="Submit" value="Save and Logout" onclick="AJAXLogout()">

		<input type="button" name="top" value="Highscores" onclick="showHighscores()">
		<input type="button" name="prize" value="Prizes" onclick="showPrizes()"><br>
<div id="responses">
<?php
	if (isset($_COOKIE["logCookie"])) //if browser supports cookies and the user has logged in this can display first
		echo "Welcome " . $_COOKIE["logCookie"] . "!<br>";
	elseif (isset($_SESSION["logSessName"])) //otherwise it will just have to use the session as a marker
		echo "Welcome " . $_SESSION["logSessName"]. "!<br>";
	else //if neither of these are set then a user is not logged in
		echo "Welcome guest! <br>(Your score will not be saved! Although you will still be able to redeem prizes!)<br> Alternatively you can play, and then decide to register and save your scores!";
	?>
</div>
</div>

<div id="tokens"> TOKENS: &nbsp;</div><div id="tok" name="toks"><?php
		if (isset($_COOKIE["logToken"])){ echo  $_COOKIE["logToken"];}  //if supports cookies, display logged tokens
		else if (isset($_SESSION["toks"])){echo $_SESSION['toks'];} // if supports session, display same logged tokens
		else {echo "10";} // not logged in/registered, display default 10
		?></div>
<div id="sessionNumber"> SESSION:&nbsp;<div id="sess" name="session">0</div> </div>
<div id="win" name="wins"><?php
		if (isset($_COOKIE["logWinnings"])) echo  $_COOKIE["logWinnings"];  //if supports cookies, display logged winnings
		else if (isset($_SESSION["winnings"]))echo $_SESSION['winnings']; // if supports session, display same logged winnings
		else echo "0"; // not logged in/registered, display default 0
		?>
</div><div id="winnings"> WINNINGS:&nbsp; </div><br>

<div id="image1"> </div>

<div id="image2"> </div>

<div id="image3"> </div> 
<div id="bottomData">
<div id="random" onclick="randomImages()"></div>
<div id="pay" onclick="pay()"> </div>
<div id="collectDiv"><button id="collect" onclick="collect()"></button></div><br>
<div id="notification"> PRESS PLAY/PAY/COLLECT! </div><br>

</div><br>

<div id="prizes"> 
    <form id="prizeList" class="rewardText"> 
        <input type="checkbox" id="prize1" value=20>1: 20 Tokens: Entry to the Special Exhibition Hall <br>
        <input type="checkbox" id="prize2" value=5>2: 5 Tokens: Unframed Posters 12" x 20" of Permanent Exhibit <br>
        <input type="checkbox" id="prize3" value=20>3: 20 Tokens: Framed Posters 12" x 20" of Permanent Exhibit<br>
        <input type="checkbox" id="prize4" value=15>4: 15 Tokens: Unframed Posters 22" x 40" of Permanent Exhibit <br>
        <input type="checkbox" id="prize5" value=80>5: 80 Tokens: Framed Posters 22" x 40" of Permanent Exhibit <br>
        <input type="checkbox" id="prize6" value=5>6: 5 Tokens: Morning Coffee and Cake in the 'Turner Cafe' <br>
        <input type="checkbox" id="prize7" value=15>7: 15 Tokens: 2 Course Lunch in 'Sea View Restaurant'<br>
        <input type="checkbox" id="prize8" value=80>8: 80 Tokens: 5 Course Evening Meal in 'The Gallery' <br>
    </form> 
    <div onclick="getPrizes()"><button>Collect Rewards!</button></div>
</div>
</div>
</body>
</html>