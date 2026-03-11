<?php

require __DIR__ . "/../source/Models/User.php";
require __DIR__ . "/../source/Models/Product.php";

use source\Models\User;
use source\Models\Product;

$user = new User("Fábio", "fabio@gmail.com");
$user->showUser();
var_dump($user);

$product = new Product();
var_dump($product);