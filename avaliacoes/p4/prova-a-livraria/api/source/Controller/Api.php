<?php

namespace Source\Controller;

class Api
{
    private array $response = [];

    protected function call(
        int $code,
        string $status,
        string $message,
        string $type = "success"
    ): self {
        http_response_code($code);
        $this->response = [
            "code" => $code,
            "type" => $type,
            "status" => $status,
            "message" => $message,
        ];

        return $this;
    }

    protected function back(mixed $data = null): void
    {
        header("Content-Type: application/json; charset=UTF-8");
        if ($data !== null) {
            $this->response["data"] = $data;
        }

        echo json_encode(
            $this->response,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
        );
    }

    protected function databaseFailure(\PDOException $exception): void
    {
        error_log($exception->getMessage());
        $this->call(500, "internal_server_error", "A database operation failed.", "error")
            ->back();
    }
}
