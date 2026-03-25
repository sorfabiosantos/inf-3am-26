<?php

// Classe Professor Course

class Professor
{
    private ?string $name;
    private ?string $email;

    public function __construct(?string $name, ?string $email = null)
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

    public function __construct(?string $title, ?int $workload, ?Professor $professor)
    {
        $this->title = $title;
        $this->workload = $workload;
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
