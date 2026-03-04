<?php

require __DIR__ . "/../source/Models/User.php";

use source\Models\User;

$user = new User("Fábio", "fabio@gmail.com");
$user->showUser();

var_dump($user);