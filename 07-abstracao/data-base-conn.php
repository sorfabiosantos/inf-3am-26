<?php

require __DIR__ . "/../source/autoload.php";

use source\Core\Connect;

//$user = Connect::getInstance();
//$users = $user->query("SELECT * FROM users");
//var_dump($users->fetchAll());
$users = Connect::getInstance()->query("SELECT * FROM users")->fetchAll();
var_dump($users);
