<?php


class User
{
    public $name;
    public $email;

    public function showUser ()
    {
        echo "Olá, {$this->name}! E-mail: {$this->email}";
    }

}

$user = new User();
$user->name = "Maria";
$user->email = "maria@gmail.com";
$user->showUser();






