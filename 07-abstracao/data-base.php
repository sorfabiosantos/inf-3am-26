<?php

// Conexão com o Banco de Dados com PDO

$host = "mysql";
$user = "root";
$password = "1234567";
$dbname = "db-acme-manha";

$conn = new PDO(
    "mysql:host=$host;dbname=$dbname",
    $user,
    $password
);

var_dump($conn);
$user = $conn->query("SELECT * FROM users");
var_dump($user);
//var_dump($user->fetch(PDO::FETCH_OBJ));
//var_dump($user->fetch(PDO::FETCH_OBJ));
$users = $user->fetchAll(PDO::FETCH_OBJ);
var_dump($users);
