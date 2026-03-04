<?php


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
//$user = new User();
//$user = new User("Fábio", "fabio@gmail.com");
//$user = new User("Fábio");
//$user = new User(email:"fabio@gmail.com", name:"Fábio");
// $user = new User("Fábio Santos", "fabio@gmail.com");
$user = new User();
echo $user->getEmail();
$user->setName("Fabio");
echo "Olá, seu nome é {$user->getName()}";
var_dump($user);
$user->showUser();






