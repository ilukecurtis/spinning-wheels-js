<?php  session_start();
$db = sqlite_open("../userTable.db", 0666, $error); //if the item is 1, it means it was redeemed, then puts "true" into the column of the prize which was identified by the loop it was in
			$prizeArray = array ("1","0","1","1","1","1","1","1");
			$maxPrizes = 8;
			$username = $_SESSION['logSessName'];
			for($loopCounter=0; $loopCounter < $maxPrizes; $loopCounter++){
			echo $prizeArray[$loopCounter];
					if($prizeArray[$loopCounter] == 1) {
					$tempVar = $loopCounter+1; //array index's start at 0, this way it will add one onto it to update the appropriate number.
					 //goes through each array and checks if it is true (1), then updates the appropriate prize redeemed with the loop number
					$query = "UPDATE prizeUser SET prize" . $tempVar . " = 'true' WHERE userName='$username'"; //which is the prize it is currently checking against
					sqlite_query($db, $query, $sqliteerror);
					}
			}
			?>