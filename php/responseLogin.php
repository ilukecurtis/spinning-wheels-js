<?php
session_start();
if (isset($_GET['function'])){
	if ($_GET['function'] == "logCheck"){ //runs on login, checks pass and user is right, passes back tokens and winnings
		$db = sqlite_open("../userTable.db", 0666, $error);
		$username = $_GET['userName'];
		$username = sqlite_escape_string($username);
		$password = $_GET['password'];
		$password = sqlite_escape_string($password);
		$result = sqlite_query($db, "SELECT tokens,winnings FROM users WHERE userName = '$username' AND password = '$password'");
		$numrows = sqlite_num_rows($result);

		if ($numrows == 1) { //if login details are correct, 1 row will return and go into here
			$_SESSION['logSessName']=$username;
			setcookie("logCookie", $username, time() + 3600); //set cookies as appropriate
			$row = sqlite_fetch_array($result); //get the result array to send back tokens and winnings
			$tokens = $row['tokens'];
			$winnings = $row['winnings'];
			if($winnings == ''){ $winnings=0;} //simple error checking, if somehow no winnings were passed or a bug was found, sets to 0
			setcookie("logTokens", $tokens, time() + 3600);
			$_SESSION['toks'] = $tokens;
			setcookie("logWinnings", $winnings, time() + 3600);
			$_SESSION['winnings'] = $winnings; //set sessions and cookies for login details
			sqlite_close($db);
			echo $tokens .'/'. $winnings; //return tokens and winnings to display in application, split by / to be unsplit by JS
			return;
			}
		else {
			session_destroy(); //if details incorrect (or not a registered name, this destroys all session and cookie data
			setcookie("logCookie", $username, time() - 3600);
			setcookie("logTokens", "", time() - 3600);
			setcookie("logWinnings", "", time() - 3600);
			sqlite_close($db);
			echo "-5";
			return;
		}	
	}
	if($_GET['function'] == "logout"){ //logs user out, updates tokens and removes cookies/session relating to play
		$username = $_GET['username'];
		$tokens = $_GET['tok'];
		$winnings = $_GET['winnings'];
		$totalScore = $_GET['totalScore'];
		$username = sqlite_escape_string($username);
		$tokens = sqlite_escape_string($tokens);
		$winnings = sqlite_escape_string($winnings);
		$totalScore = sqlite_escape_string($totalScore);
		$db = sqlite_open("../userTable.db", 0666, $error);
		$result = sqlite_query($db, "UPDATE users SET tokens = '$tokens', winnings = '$winnings', totalScore = '$totalScore' WHERE userName = '$username'"); //updates on row with username same as what was sent over URL
		session_destroy();
		setcookie("logCookie", "", time() - 3600);
		setcookie("logTokens","", time() - 3600);
		setcookie("logWinnings", "", time() - 3600);
		sqlite_close($db);
		echo "10";
		return;
	}
	if($_GET['function'] == "showHiscores"){ //shows highscores of users
		$db = sqlite_open('../userTable.db', 0666, $error);
		$result=sqlite_query($db,"SELECT * FROM users ORDER BY totalScore DESC LIMIT 10");
		echo "<table><tr class=highTableTop> <th> Name</th><th>Score</th></tr>"; //echos all the data for the classes and then displays top 10
		while ($arrayHighscores = sqlite_fetch_array($result)){
			echo "<tr><td class='highTableData'><b>".$arrayHighscores['userName']."</b></td><td class='highTableScore'>".$arrayHighscores['totalScore']."</td></tr>";
		}
		echo "<table>";
		sqlite_close($db);
		return;
	}
	if($_GET['function'] == "registerUser"){
		$db = sqlite_open("../userTable.db", 0666, $error);
		$tempUser = $_GET['user'];
		$password = $_GET['password'];
		$tokens = $_GET['tokens'];
		$winnings = $_GET['winnings'];
		$totalScore = $_GET['totalScore'];
		$tempUser = sqlite_escape_string($tempUser);
		$password = sqlite_escape_string($password);
		$tokens = sqlite_escape_string($tokens);
		$winnings = sqlite_escape_string($winnings);
		$totalScore = sqlite_escape_string($totalScore);//prevent SQL injection
		$checkIfUserExists = sqlite_query($db, "SELECT username FROM users WHERE username = '$tempUser'", $sqliteerror);
		$count = sqlite_num_rows($checkIfUserExists); //if row returns 1, means that user is already in system, name taken
		if ($count == 1) {
		if(isset($_SESSION['logSessName'])){
				unset($_SESSION['logSessName']);
			}
			echo "-1";
			}
		else {
			sqlite_query($db, "INSERT INTO users (userName, password, tokens, winnings, totalScore) VALUES ('$tempUser', '$password','$tokens', '$winnings', '$totalScore');", $sqliteerror);
			sqlite_query($db, "INSERT INTO prizeUser VALUES ('$tempUser', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')", $sqliteerror); //makes a record of no prizes redeemed upon register
			$_SESSION['logSessName']=$tempUser; //if no rows return, add to database, and set appropriate cookies and sessions relating to user
			$_SESSION['toks'] = $tokens;
			$_SESSION['winnings'] = $winnings;
			setcookie("logCookie", $tempUser, time() + 3600);
			setcookie("logTokens", $tokens, time() + 3600);
			setcookie("logWinnings", $winnings, time() + 3600);
			echo "success";	
		}
		sqlite_close($db);
		return;
	}
	if($_GET['function'] == "updateResults"){
		$db = sqlite_open("../userTable.db", 0666, $error);
		if (isset($_SESSION['logSessName'])){ //update only if the user is logged in
				$username = $_SESSION['logSessName'];
				$tokens = $_GET['tokens'];
				$winnings = $_GET['winnings'];
				$score = $_GET['totalScore'];
				$tokens = sqlite_escape_string($tokens);
				$winnings = sqlite_escape_string($winnings);
				$score = sqlite_escape_string($score);
				sqlite_query($db, "UPDATE users SET tokens = '$tokens', winnings = '$winnings', totalScore = '$score' WHERE userName = '$username'", $sqliteerror);
				//set the sessions and tokens, redeclare due to updating the values, redeclare username so that cookies are not out of sync
				$_SESSION['toks'] = $tokens;
				$_SESSION['winnings'] = $winnings;
				setcookie("logCookie", $username, time() + 3600);
				setcookie("logTokens", $tokens, time() + 3600);
				setcookie("logWinnings", $winnings, time() + 3600);
				sqlite_close($db);
				echo "success";
				return;
		}
		else { echo "fail"; }
	}
	if ($_GET['function'] == "storePrizes"){
		if (isset($_SESSION['logSessName'])){ // this passes over the array and then iterates through each item.
			$db = sqlite_open("../userTable.db", 0666, $error); //if the item is 1, it means it was redeemed, then puts "true" into the column of the prize which was identified by the loop it was in
			$prizeArray = $_GET['prizes'];
			$prizeArray= explode(',', $prizeArray); //put prizes into an array, prior to doing this it was one long string of e.g. 1,1,0,1,1,0,1,0
			$maxPrizes = $_GET['maxPrizes']; //by passing max prizes over it will be easier to expand the prizes able to be redeemed at a later date
			$username = $_SESSION['logSessName'];
			for($loopCounter=0; $loopCounter < $maxPrizes; $loopCounter++){
					if($prizeArray[$loopCounter] == 1) {
					$tempVar = $loopCounter;
					 //goes through each array and checks if it is true (1), then updates the appropriate prize redeemed with the loop number
					$query = "UPDATE prizeUser SET prize" . $tempVar . " = 'true' WHERE userName='$username'"; //which is the prize it is currently checking against
					sqlite_query($db, $query, $sqliteerror);
					}
			}
		}
		sqlite_close($db);
		return;	
	}
	if($_GET['function'] == "showPrizes"){
		$db = sqlite_open("../userTable.db", 0666, $error);
		$result = sqlite_query($db, "SELECT * FROM prizeUser ORDER BY userName LIMIT 10");
		echo "<table><tr class=highTableTop> <th> Name</th><th>Prize 1</th><th>Prize 2</th><th>Prize 3</th><th>Prize 4</th><th>Prize 5</th><th>Prize 6</th><th>Prize 7</th><th>Prize 8</th></tr>";
		while ($arrayPrize = sqlite_fetch_array($result)){
			echo "<tr><td class='highTableData'><b>".$arrayPrize['userName']."</b></td><td class='highTableScore'>".$arrayPrize['prize1']."</td><td class='highTableScore'>".$arrayPrize['prize2']."</td><td class='highTableScore'>".$arrayPrize['prize3']."</td><td class='highTableScore'>".$arrayPrize['prize4']."</td><td class='highTableScore'>".$arrayPrize['prize5']."</td><td class='highTableScore'>".$arrayPrize['prize6']."</td><td class='highTableScore'>".$arrayPrize['prize7']."</td><td class='highTableScore'>".$arrayPrize['prize8']."</td></tr>";
		}
		echo "<table>";
		sqlite_close($db);
		return;
	}
}
?>