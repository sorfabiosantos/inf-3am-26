<?php



class Client
{
    private $name;
    private $email;

    public function __construct(string $name = null, string $email = null)
    {
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
}

class Personal extends Client
{
    private $cpf;

    public function __construct(string $name = null, string $email = null, string $cpf = null)
    {
        //$this->name = $name;
        //$this->email = $email;
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

$client = new Client('John Doe', 'fabio@gmail.com');
var_dump($client);

$personal = new Personal("Fábio Santos", "fabio@gmail.com", "09876546789");
var_dump($personal);
$personal->showPersonal();


