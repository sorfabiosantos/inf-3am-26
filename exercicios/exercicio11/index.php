<?php

// Exercício 11 - Formas Geométricas com Abstração

// use source\Models\Geometry\Circle;
// use source\Models\Geometry\Rectangle;
// use source\Models\Geometry\Triangle;

// TODO: Implementar a classe abstrata Shape no namespace source\Models\Geometry
// TODO: Implementar as classes concretas Circle, Rectangle e Triangle estendendo Shape
// TODO: Instanciar objetos de cada forma geométrica
// TODO: Demonstrar a abstração chamando os métodos calculateArea() e calculatePerimeter()
// TODO: Exibir as informações formatadas de cada forma com o método show()

echo "Exercício 11 - Formas Geométricas (Abstração)" . PHP_EOL;
echo "===============================================" . PHP_EOL . PHP_EOL;

// Exemplo de uso (após implementar as classes):
//
// $circle = new Circle("Azul", 5.0);
// $rectangle = new Rectangle("Verde", 8.0, 4.5);
// $triangle = new Triangle("Vermelho", 6.0, 5.0, 5.0, 4.0);
//
// echo $circle->show() . PHP_EOL . PHP_EOL;
// echo $rectangle->show() . PHP_EOL . PHP_EOL;
// echo $triangle->show() . PHP_EOL . PHP_EOL;
//
// // Polimorfismo: percorrendo diferentes formas pela classe base Shape
// $shapes = [$circle, $rectangle, $triangle];
// foreach ($shapes as $shape) {
//     echo get_class($shape) . " - Área: " . number_format($shape->calculateArea(), 2, ',', '.') . PHP_EOL;
// }

