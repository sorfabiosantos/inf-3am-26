<?php

// Classe Professor Course

class Professor
{
    private ?string $name;
    private ?string $email;

    public function __construct(?string $name = null, ?string $email = null)
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
}

class Course
{
    private ?string $title;
    private ?int $workload;
    private ?Professor $professor;

    public function __construct(?string $title, ?int $workload, ?Professor $professor = null)
    {
        $this->title = $title;
        $this->workload = $workload;
        $this->professor = $professor;
    }

    public function getProfessor(): ?Professor
    {
        return $this->professor;
    }

    public function setProfessor(?Professor $professor): void
    {
        $this->professor = $professor;
    }

    // Associacao: Course conhece Professor por referencia de objeto.
    public function describe(): string
    {
        return "Course: {$this->title}" . PHP_EOL
            . "Workload: {$this->workload}h" . PHP_EOL
            . "Professor: {$this->professor->getName()} ({$this->professor->getEmail()})";
    }
}

$professor = new Professor("Maria Silva", "maria@gmail.com");
$course = new Course("PHP OOP", 40, $professor);

echo "Exemplo de Associação" . "<br>";
echo "----------------------" . "<br>";
echo $course->describe() . "<br>";

$coursePHP = new Course("PHP OOP", 40, new Professor("Fábio", "fabio@gmail.com"));
var_dump($coursePHP);

class Address
{
    private string $street;
    private string $city;
    private string $state;
}

class Person
{
    private string $name;
    private string $email;
    private Address $address;
}