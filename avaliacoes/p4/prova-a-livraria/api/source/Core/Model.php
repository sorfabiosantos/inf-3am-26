<?php

namespace Source\Core;

use PDO;
use PDOException;

abstract class Model
{
    protected string $table;
    protected array $fillable = [];
    protected ?string $errorMessage = null;

    public function getErrorMessage(): ?string
    {
        return $this->errorMessage;
    }

    public function selectAllActive(): array
    {
        $sql = sprintf(
            "SELECT * FROM `%s` WHERE `active` = 1 ORDER BY `name` ASC",
            $this->table
        );

        return Connect::getInstance()->query($sql)->fetchAll();
    }

    public function insert(): bool
    {
        $payload = $this->payloadFromGetters();
        if ($payload === []) {
            $this->errorMessage = "No persistable fields were provided.";
            return false;
        }

        $columns = array_map(static fn(string $column): string => "`{$column}`", array_keys($payload));
        $placeholders = array_map(static fn(string $column): string => ":{$column}", array_keys($payload));
        $sql = sprintf(
            "INSERT INTO `%s` (%s) VALUES (%s)",
            $this->table,
            implode(", ", $columns),
            implode(", ", $placeholders)
        );

        try {
            $statement = Connect::getInstance()->prepare($sql);
            foreach ($payload as $column => $value) {
                $statement->bindValue(
                    ":{$column}",
                    $value,
                    is_int($value) ? PDO::PARAM_INT : PDO::PARAM_STR
                );
            }
            $statement->execute();

            if (method_exists($this, "setId")) {
                $this->setId((int)Connect::getInstance()->lastInsertId());
            }

            return true;
        } catch (PDOException $exception) {
            error_log($exception->getMessage());
            $this->errorMessage = "The record could not be saved.";
            return false;
        }
    }

    protected function payloadFromGetters(): array
    {
        $payload = [];
        foreach ($this->fillable as $field) {
            $getter = "get" . ucfirst($field);
            if (!method_exists($this, $getter)) {
                continue;
            }

            $value = $this->{$getter}();
            if ($value !== null) {
                $column = strtolower((string)preg_replace("/[A-Z]/", "_$0", $field));
                $payload[$column] = $value;
            }
        }

        return $payload;
    }
}
