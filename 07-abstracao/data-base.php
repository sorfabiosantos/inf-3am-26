<?php

// Conexão com o Banco de Dados com PDO

$host = "mysql"; // localhost
$user = "root";
$password = "1234567"; // ""
$dbname = "db-acme-manha";

$conn = new PDO(
    "mysql:host=$host;dbname=$dbname",
    $user,
    $password
);

var_dump($conn);

$users = $conn->query("SELECT * FROM users");
var_dump($users->fetchAll(PDO::FETCH_OBJ));

