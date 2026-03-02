<?php

namespace source\Models;

class User
{
    private $name;
    private $email;
    public function __construct(string $name = null, string $email = null)
    {
        $this->name = $name;
        $this->email = $email;
    }
}