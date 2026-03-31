<?php

require __DIR__ . "/../source/autoload.php";

use source\Core\Connect;

$conn = Connect::getInstance();
var_dump($conn);
$user = $conn->query("SELECT * FROM users");
var_dump($user);
$users = $user->fetchAll();
var_dump($users);