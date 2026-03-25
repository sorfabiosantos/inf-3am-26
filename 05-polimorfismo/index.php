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
        //echo parent::makeSound() . "<br>";
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

$animal = new Animal();
var_dump($animal);
echo "Animal: " . $animal->makeSound() . "<br>";

$dog = new Dog();
echo "Cachorro: " . $dog->makeSound() . "<br>";

$cat = new Cat();
echo "Gato: " . $cat->makeSound() . "<br>";


$animals = [
    new Animal(),
    new Dog(),
    new Cat(),
];

var_dump($animals);
echo "Exemplo de Polimorfismo <br>";
echo "------------------------ <br>";

foreach ($animals as $animal) {
    echo get_class($animal) . " -> " . $animal->makeSound() . "<br>";
}


