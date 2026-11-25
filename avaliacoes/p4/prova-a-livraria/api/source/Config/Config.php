<?php

$dbHost = getenv("P4_DB_HOST") ?: getenv("P3_DB_HOST") ?: "127.0.0.1";
$dbPort = getenv("P4_DB_PORT") ?: getenv("P3_DB_PORT") ?: "3306";
$dbUser = getenv("P4_DB_USER") ?: getenv("P3_DB_USER") ?: "root";
$dbPassword = getenv("P4_DB_PASSWORD") ?: getenv("P3_DB_PASSWORD") ?: "";

defined("CONF_DB_HOST") || define("CONF_DB_HOST", $dbHost);
defined("CONF_DB_PORT") || define("CONF_DB_PORT", (int)$dbPort);
defined("CONF_DB_NAME") || define("CONF_DB_NAME", "db-livraria");
defined("CONF_DB_USER") || define("CONF_DB_USER", $dbUser);
defined("CONF_DB_PASS") || define("CONF_DB_PASS", $dbPassword);
