var gotoReplaceImage; //LINE 223 IS WHERE ASSIGNMENT TWO BEGINS. UP UNTIL THEN ASSIGNMENT ONE FUNCTIONALITY CONTINUES
var gotoWinnings;
var putImage;
var tokens = 0;
var winnings = 0;
var sessionNum = 0;
var ajaxUpdate = null;
var ajaxStorePrize = null;
function randomImages(){
	tokens=parseInt(document.getElementById("tok").innerHTML);
        if (sessionNum == 10){
            alert("Session completed, you can now collect or pay! (Or keep going for another 10 games!)");
            document.getElementById("notification").innerHTML = ("");
            document.getElementById("collect").style.backgroundImage=('url(pictures/collect.jpg)');
            document.getElementById("collect").disabled = false;
            tokens = parseInt(document.getElementById("tok").innerHTML);
            sessionNum=0;
			document.getElementById("sess").innerHTML =sessionNum;
            return;
        }
        else if (tokens >= 1){
			tokens = parseInt(document.getElementById("tok").innerHTML);
			 winnings = parseInt(document.getElementById("win").innerHTML); //these two lines are important. ^
            sessionNum = parseInt(document.getElementById("sess").innerHTML);
			tokens=tokens-1;
            document.getElementById("tok").innerHTML = tokens; 
            document.getElementById("collect").style.backgroundImage=('url(pictures/collectDisable.gif)');
            document.getElementById("collect").disabled = true;
            document.getElementById('prizes').style.visibility = 'hidden';
        }
        else {
           alert("Run out of tokens! Please collect or pay!");
		   sessionNum = parseInt(document.getElementById("sess").innerHTML);
           tokens=parseInt(document.getElementById("tok").innerHTML);
           document.getElementById("collect").style.backgroundImage=('url(pictures/collect.jpg)');
           document.getElementById("collect").disabled = false;
           return;
        }
    putImage = setInterval(function(){putRandom()},150);
    gotoReplaceImage = setTimeout(stopRandom,3000);
	tokens = document.getElementById("tok").innerHTML;
}
function putRandom(){
    var randomImage = [];
    randomImage[0] = Math.floor(Math.random() * 4);
    randomImage[1] = Math.floor(Math.random() * 4);
    randomImage[2] = Math.floor(Math.random() * 4);
    for (changeIDImages = 0; changeIDImages < 3; changeIDImages++)
    {
        document.getElementById('image' + (changeIDImages + 1).toString()).style.backgroundImage =( 'url(pictures/' + randomImage[changeIDImages] + '.jpg)');
    }
}
function stopRandom(){
    clearInterval(putImage);
    gotoReplaceImage = setTimeout(putRandomImageInDIV,200);
}

function putRandomImageInDIV() {
			
        var slotImage = []; 
        slotImage[0] = Math.floor(Math.random() * 4);
        slotImage[1] = Math.floor(Math.random() * 4);
        slotImage[2] = Math.floor(Math.random() * 4);

        var findReplacementID, putReplacementImage;
        for (findReplacementID = 0; findReplacementID < 3; findReplacementID++)
        {

            for (putReplacementImage = 0; putReplacementImage < 4; putReplacementImage++)
            {
                if (slotImage[findReplacementID] == putReplacementImage)
                {
                    document.getElementById('image' + (findReplacementID + 1).toString()).style.backgroundImage =( 'url(pictures/' + (putReplacementImage) + '.jpg' + ')');
                    
                }
            }
        }
        gotoWinnings= setTimeout(winningsFunc(slotImage),1000);
}
function winningsFunc(slotImage){
    var rewardGiven;
    if ((slotImage[0] == 3) || (slotImage[1] == 3) || (slotImage[2] == 3)){
          var tempReward 
          var placeholderReward
          if (winnings > 1){
                tempReward = 1; 
            }
            else {
                tempReward = 0;
                placeholderReward=1;
            }
        if ((slotImage[1] == 3) && (slotImage[2] == 3)){
            
            if (winnings > 5){
                tempReward = 5; 
            }
            else {
                tempReward = 0;
                winnings = 0;
                placeholderReward=5;
            }
        if ((slotImage[0] == 3) && (slotImage[1] == 3) && (slotImage[2] == 3)){
            tempReward = 0;
            winnings = 0;
            placeholderReward="ALL";
			tokens = 0;
        }
        }
        if (tempReward > 0){
             document.getElementById("notification").innerHTML = ("YOU LOST " + tempReward + " TOKENS THIS ROUND! (If you had insuffient winnings the score has been reset to 0)");
        }
        else{
            document.getElementById("notification").innerHTML = ("YOU LOST " + placeholderReward + " TOKENS THIS ROUND! (If you had insufficient winnings the score has been reset to 0)");
        }
        winnings = winnings - tempReward;
        document.getElementById("win").innerHTML = winnings;
        rewardGiven = true;
        sessionNum=sessionNum+1;
        document.getElementById("sess").innerHTML = sessionNum;
		document.getElementById("tok").innerHTML = tokens;
		updateResults(); //update results after play
        return; 
    }

    for (var positiveReward=0; positiveReward<3; positiveReward++)
    {
        if ((slotImage[1] == positiveReward) && (slotImage[2] == positiveReward)) {
           
            var tempReward
            if (positiveReward==0){
                tempReward = 2; 
            }
            else if (positiveReward==1){
                tempReward = 4;
            }
            else if (positiveReward==2){
                tempReward = 6;
            }
            if (slotImage[0] == positiveReward){
                if (positiveReward==0){
                tempReward = 10; 
                }
                else if (positiveReward==1){
                tempReward = 20;
                }
                else if (positiveReward==2){
                tempReward = 40;
                }
            }
            winnings = winnings + tempReward;
            document.getElementById("win").innerHTML = winnings;
			 
            document.getElementById("notification").innerHTML=("YOU WON " + tempReward + " THIS ROUND");
            rewardGiven = true;
            sessionNum=sessionNum+1;
            document.getElementById("sess").innerHTML = sessionNum;
			updateResults(); //update results after play
            return;
        }
    }
    if (rewardGiven != true) {
        document.getElementById("notification").innerHTML=("YOU WON NOTHING THIS SPIN, TRY AGAIN!");
        sessionNum=sessionNum+1;
        document.getElementById("sess").innerHTML = sessionNum;
		updateResults(); //update results after play
    }
	tokens = parseInt(document.getElementById("tok").innerHTML);
}
function pay(){
	tokens = parseInt(document.getElementById("tok").innerHTML);
	if (tokens == 0) {
        tokens=10;
        document.getElementById("tok").innerHTML = tokens; 
        document.getElementById("collect").style.backgroundImage=('url(pictures/collect.jpg)');
        document.getElementById("collect").disabled = false;
        document.getElementById('prizes').style.visibility = 'hidden';
        document.getElementById("sess").innerHTML = sessionNum;
    }
    else {
        tokens = tokens + 10;
		document.getElementById("tok").innerHTML = tokens; 
        document.getElementById("collect").style.backgroundImage=('url(pictures/collectDisable.gif)');
        document.getElementById("collect").disabled = true;
        document.getElementById('prizes').style.visibility = 'hidden';
        document.getElementById("sess").innerHTML = sessionNum;
	}
	updateResults();
}

function collect(){
document.getElementById('prizes').style.visibility = 'visible';
document.getElementById("sess").innerHTML = sessionNum;
tokens = parseInt(document.getElementById("tok").innerHTML);
}

function getPrizes(){
    var tempCost = 0;
	winnings = parseInt(document.getElementById("win").innerHTML);
    var tempPrizeSelected = [];
    for (var cPrizeLoop=1; cPrizeLoop<9; cPrizeLoop++){
        if (document.getElementById('prize' + (cPrizeLoop).toString()).checked){
            var val;
            val = parseInt(document.getElementById('prize' + (cPrizeLoop).toString()).value);
            tempPrizeSelected[cPrizeLoop] = ((cPrizeLoop.toString()) + ' ')
            tempCost = tempCost + val;
            document.getElementById('prize' + (cPrizeLoop).toString()).checked = false
        }
    }
    if (winnings >= tempCost){
        winnings = winnings - tempCost;
        alert('You have used ' + tempCost + ' winnings tokens and have ' + winnings + ' left! Prizes redeemed are: ' + tempPrizeSelected.join(''));
        document.getElementById("win").innerHTML = winnings;
        sessionNum=0;
        document.getElementById("sess").innerHTML = sessionNum;
        document.getElementById('prizes').style.visibility = 'hidden';
		tokens = parseInt(document.getElementById("tok").innerHTML);
		updatePrizes(tempPrizeSelected);
    }
    else {
        alert("Not enough winnings! Please select different prizes!");
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START OF AJAX REQUESTS. PUT HERE BECAUSE THE FUNCTIONS CALLED WHEN PLAYED OR COLLECTION IS MADE GOES TO THIS JAVASCRIPT FILE//
////////////////////////////////////////NO SENSITIVE DATA SENT HERE/////////////////////////////////////////////////////////////
function updateResults(){
	ajaxUpdate = new XMLHttpRequest(); //this updates between invocations of the playing
	var tempScore;
	tokens = parseInt(document.getElementById("tok").innerHTML);
	winnings=parseInt(document.getElementById("win").innerHTML);
	tempScore = tokens + winnings;
	ajaxUpdate.onreadystatechange=function() {
										if (ajaxUpdate.readyState == 4) { 
											if (ajaxUpdate.responsetext != "fail"){ //updated results fine, no errors.
											}
											else { alert("Update Failed! Please save and logout to attempt to save scores");}
										}
									}
	var url = "php/responseLogin.php?function=updateResults&tokens=" + tokens + "&winnings=" + winnings + "&totalScore=" + tempScore;
	ajaxUpdate.open("GET", url, true);
	ajaxUpdate.send();
}
function updatePrizes(prizeArray){
	var maxPrizes = 9;
	// updating the prizes in the user table i need to convert what was redeemed (the number) and simply put a 1 there to indicate true.
	for (var tempLoop = 0; tempLoop < maxPrizes; tempLoop++){
		if (prizeArray[tempLoop] > 0) {
			prizeArray[tempLoop] = 1; //if it has a value it means that index was selected, then we can change it to a 1, meaning true, and send that to the php
		} 
		else {
			prizeArray[tempLoop] = 0;
		}//a simple way round of doing this and then sending over the entire array to php
	}//if not redeemed goes in undefined, so in PHP check if EQUAL to 1, not NOT EQUAL to 0
	ajaxStorePrize = new XMLHttpRequest();
	ajaxStorePrize.onreadystatechange=function(){
												if(ajaxStorePrize.readyState == 4){
													if(ajaxStorePrize.responsetext != "fail"){
													}
													else{alert("fail");}
												}

											}
	var url = "php/responseLogin.php?function=storePrizes&prizes=" + prizeArray + "&maxPrizes=" + maxPrizes;
	ajaxStorePrize.open("GET", url, true);
	ajaxStorePrize.send();
	updateResults(); //then update the winnings that were just removed
}
