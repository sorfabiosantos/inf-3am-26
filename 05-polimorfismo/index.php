<?php

class Animal
{
    public function makeSound(): string
    {
        return "Som genérico";
    }
}

class Dog extends Animal
{
    public function makeSound(): string
    {
        return "Au Au!";
    }
}

class Cat extends Animal
{
    public function makeSound(): string
    {
        return "Miau!";
    }
}

$animals = [
    new Animal(),
    new Dog(),
    new Cat(),
];

echo "Exemoplo de Polimorfismo <br>";
echo "------------------------ <br>";

foreach ($animals as $animal) {
    echo get_class($animal) . " -> " . $animal->makeSound() . "<br>";
}
