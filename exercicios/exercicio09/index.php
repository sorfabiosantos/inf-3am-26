<?php

// Exercício 09 - Sistema de Veículos com Polimorfismo e Associação

// use source\Models\Vehicles\Owner;
// use source\Models\Vehicles\Car;
// use source\Models\Vehicles\Motorcycle;

// TODO: Implementar as classes Owner, Car, Motorcycle no namespace source\Models\Vehicles
// TODO: Instanciar objetos Owner, Car e Motorcycle
// TODO: Demonstrar o polimorfismo com o método calculateTax()
// TODO: Exibir as informações dos veículos e proprietários

echo "Exercício 09 - Sistema de Veículos (Polimorfismo + Associação)" . PHP_EOL;
echo "=============================================================" . PHP_EOL . PHP_EOL;

// Exemplo de uso (após implementar as classes):
// 
// $owner1 = new Owner(1, "João Silva", "123.456.789-00", "(11) 98765-4321");
// $owner2 = new Owner(2, "Maria Santos", "987.654.321-00", "(21) 99876-5432");
//
// $car = new Car("ABC123456", "Toyota", "Corolla", 2023, 85000.00, $owner1, 4, "Gasolina");
// $motorcycle = new Motorcycle("XYZ789012", "Honda", "CB 500", 2022, 15000.00, $owner2, 500);
//
// echo $car->show() . PHP_EOL . PHP_EOL;
// echo "Imposto do Carro: R$ " . number_format($car->calculateTax(), 2, ',', '.') . PHP_EOL . PHP_EOL;
//
// echo $motorcycle->show() . PHP_EOL . PHP_EOL;
// echo "Imposto da Motocicleta: R$ " . number_format($motorcycle->calculateTax(), 2, ',', '.') . PHP_EOL . PHP_EOL;

