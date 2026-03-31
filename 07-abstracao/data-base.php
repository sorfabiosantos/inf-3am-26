<?php

//use \PDO;

$local = "mysql"; // localhost
$user = "root";
$dbName = "db-acme-manha";
$password = "1234567"; // ""

$conn = new PDO(
    "mysql:host=$local;dbname=$dbName;charset=utf8",
    $user,
    $password
);

$users = $conn->query("SELECT * FROM users");
var_dump($users->fetchAll(PDO::FETCH_OBJ));