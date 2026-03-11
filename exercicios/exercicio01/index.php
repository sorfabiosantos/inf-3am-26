<?php

//require __DIR__ . "/../../source/Models/User.php";
//require __DIR__ . "/../../source/Models/Product.php";

require __DIR__ . "/../../source/autoload.php";

use source\Models\User;
use source\Models\Product;

echo __DIR__;

$user = new User();
var_dump($user);

$product = new Product();
var_dump($product);