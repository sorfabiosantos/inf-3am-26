<?php

namespace source\Models;

class User
{
    private $name;
    private $email;

    public function __construct (string $name = null, string $email = null)
    {
        //echo "Olá, User!";
        $this->name = $name;
        $this->email = $email;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function showUser ()
    {
        echo "Olá, {$this->name}! E-mail: {$this->email}";
    }

}