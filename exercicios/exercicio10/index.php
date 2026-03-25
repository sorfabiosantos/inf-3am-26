<?php

// Exercício 10 - Sistema de Biblioteca com Polimorfismo e Associação

// use source\Models\Library\Author;
// use source\Models\Library\Member;
// use source\Models\Library\PhysicalBook;
// use source\Models\Library\Ebook;
// use source\Models\Library\Audiobook;
// use source\Models\Library\Loan;

// TODO: Implementar as classes Author, Member, PhysicalBook, Ebook, Audiobook, Loan no namespace source\Models\Library
// TODO: Instanciar objetos de cada classe
// TODO: Demonstrar o polimorfismo com o método calculateLateFee()
// TODO: Calcular multas com base em atrasos
// TODO: Exibir as informações de empréstimos

echo "Exercício 10 - Sistema de Biblioteca (Polimorfismo + Associação)" . PHP_EOL;
echo "=================================================================" . PHP_EOL . PHP_EOL;

// Exemplo de uso (após implementar as classes):
// 
// $author1 = new Author(1, "Machado de Assis", "Brasil", 1839);
// $author2 = new Author(2, "Jorge Amado", "Brasil", 1912);
//
// $member1 = new Member(1, "João Silva", "joao@example.com", "2023-01-15");
// $member2 = new Member(2, "Maria Santos", "maria@example.com", "2023-02-20");
//
// $physicalBook = new PhysicalBook("978-1234567890", "Memórias Póstumas de Brás Cubas", $author1, 1899, 512, 5, "Seção A - Prateleira 3");
// $ebook = new Ebook("978-0987654321", "Capitães da Areia", $author2, 1937, 280, 4.5, "EPUB");
// $audiobook = new Audiobook("978-1122334455", "Dom Casmurro", $author1, 1899, 300, 480);
//
// $loan1 = new Loan(1, $member1, $physicalBook, "2024-01-10", "2024-01-24", "2024-01-20");
// $loan2 = new Loan(2, $member2, $ebook, "2024-01-15", "2024-01-29", "2024-02-05");
// $loan3 = new Loan(3, $member1, $audiobook, "2024-01-20", "2024-02-03", null);
//
// echo $loan1->show() . PHP_EOL . PHP_EOL;
// echo $loan2->show() . PHP_EOL . PHP_EOL;
// echo $loan3->show() . PHP_EOL . PHP_EOL;

