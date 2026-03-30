<?php

require __DIR__ . "/../source/autoload.php";

use source\Core\Connect;

$users = Connect::getInstance()->query("SELECT * FROM users")->fetchAll();

var_dump($users);