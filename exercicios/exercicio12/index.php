<?php

// Exercício 12 - Sistema de Notificações com Abstração

// use source\Models\Notification\EmailNotification;
// use source\Models\Notification\SmsNotification;
// use source\Models\Notification\PushNotification;

// TODO: Implementar a classe abstrata Notification no namespace source\Models\Notification
// TODO: Implementar as classes concretas EmailNotification, SmsNotification e PushNotification
// TODO: Instanciar objetos de cada tipo de notificação
// TODO: Demonstrar a abstração chamando os métodos send(), format() e log()

echo "Exercício 12 - Sistema de Notificações (Abstração)" . PHP_EOL;
echo "====================================================" . PHP_EOL . PHP_EOL;

// Exemplo de uso (após implementar as classes):
//
// $email = new EmailNotification(
//     "joao@email.com",
//     "Bem-vindo ao Sistema!",
//     "Olá João, seja bem-vindo à nossa plataforma. Acesse agora e explore todos os recursos disponíveis para você.",
//     "noreply@sistema.com",
//     true
// );
//
// $sms = new SmsNotification(
//     "Maria Santos",
//     "Confirmação de Pedido",
//     "Seu pedido #12345 foi confirmado e será entregue em até 3 dias úteis.",
//     "(11) 99999-9999"
// );
//
// $push = new PushNotification(
//     "Carlos Souza",
//     "Nova Mensagem",
//     "Você recebeu uma nova mensagem de Ana Paula.",
//     "abc123xyz456token",
//     "Android"
// );
//
// echo $email->format() . PHP_EOL . PHP_EOL;
// echo $email->send() . PHP_EOL;
// echo $email->log() . PHP_EOL . PHP_EOL;
//
// echo $sms->format() . PHP_EOL . PHP_EOL;
// echo $sms->send() . PHP_EOL;
// echo $sms->log() . PHP_EOL . PHP_EOL;
//
// echo $push->format() . PHP_EOL . PHP_EOL;
// echo $push->send() . PHP_EOL;
// echo $push->log() . PHP_EOL . PHP_EOL;
//
// // Polimorfismo: percorrendo diferentes notificações pela classe base Notification
// $notifications = [$email, $sms, $push];
// foreach ($notifications as $notification) {
//     echo get_class($notification) . " | Assunto: " . $notification->getSubject() . PHP_EOL;
// }

