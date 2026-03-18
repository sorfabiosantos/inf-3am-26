<?php

namespace source\Models\Bank;

class Personal
{
    private $cpf;

    public function __construct(string $name = null, string $email = null, string $cpf = null)
    {
        parent::__construct($name, $email);
        $this->cpf = $cpf;
    }

    public function getCpf(): ?string
    {
        return $this->cpf;
    }

    public function setCpf(string $cpf): void
    {
        $this->cpf = $cpf;
    }

    public function showPersonal(): void
    {
        echo "Nome: {$this->getName()}";
        echo " - CPF: {$this->cpf}";
    }
}