<?php

use CoffeeCode\Router\Router;

require __DIR__ . "/vendor/autoload.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if (($_SERVER["REQUEST_METHOD"] ?? "GET") === "OPTIONS") {
    http_response_code(204);
    exit;
}

$scheme = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
$host = $_SERVER["HTTP_HOST"] ?? "localhost";
$apiPath = str_replace("\\", "/", dirname($_SERVER["SCRIPT_NAME"] ?? "/api/index.php"));
$projectUrl = "{$scheme}://{$host}" . rtrim($apiPath, "/");

$route = new Router($projectUrl, ":");
$route->namespace("Source\\Controller");

$route->get("/genres", "Catalogs:listGenres");
$route->get("/suppliers", "Catalogs:listSuppliers");
$route->get("/publishers", "Catalogs:listPublishers");

// TODO: register GET /books and POST /books for the Books controller.

$route->dispatch();

if ($route->error()) {
    $status = $route->error();
    http_response_code($status);
    echo json_encode([
        "code" => $status,
        "type" => "error",
        "status" => $status === 404 ? "not_found" : "route_error",
        "message" => $status === 404
            ? "The requested route was not found."
            : "The requested route could not be dispatched.",
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
