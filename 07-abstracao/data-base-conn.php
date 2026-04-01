<?php

require __DIR__ . "/../source/autoload.php";

use source\Core\Connect;


/*$conn = Connect::getInstance();
var_dump($conn);
$user = $conn->query("SELECT * FROM users");
var_dump($user);
var_dump($user->fetchAll());*/

$users = Connect::getInstance()->query("SELECT * FROM users")->fetchAll();
var_dump($users);
