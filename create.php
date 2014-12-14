<?php
$db = sqlite_open('userTable.db', 0666, $error);
if (!$db){die($error);}
sqlite_query($db, "DROP TABLE users");
sqlite_query($db,"CREATE TABLE users (userName varchar(10) PRIMARY KEY, password varchar(20), tokens number(10), winnings number(10), totalScore number(10));",$sqliteerror);
sqlite_query($db, "DROP TABLE prizeUser");
sqlite_query($db, "CREATE TABLE prizeUser (userName varchar(10), prize1 boolean, prize2 boolean, prize3 boolean, prize4 boolean, prize5 boolean, prize6 boolean, prize7 boolean, prize8 boolean, FOREIGN KEY (userName) REFERENCES users(userName));");
sqlite_query($db, "INSERT INTO users VALUES ('Luke', 'password', '10', '89', '99')");
sqlite_query($db, "INSERT INTO users VALUES ('Josh', 'password', '11', '27', '38')");
sqlite_query($db, "INSERT INTO users VALUES ('Katy', 'password', '2', '30', '32')");
sqlite_query($db, "INSERT INTO prizeUser VALUES ('Luke', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')");
sqlite_query($db, "INSERT INTO prizeUser VALUES ('Josh', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')");
sqlite_query($db, "INSERT INTO prizeUser VALUES ('Katy', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false')");
?>