<?php

require_once __DIR__ . '/../../source/autoload.php';

use source\Models\Notification\EmailNotification;
use source\Models\Notification\SmsNotification;
use source\Models\Notification\PushNotification;

echo "Exercício 12 - Sistema de Notificações (Abstração)" . "<br>";
echo "====================================================" . "<br>" . "<br>";

// --- E-mail ---
$email = new EmailNotification(
    "joao@email.com",
    "Bem-vindo ao Sistema!",
    "Olá João, seja bem-vindo à nossa plataforma. Acesse agora e explore todos os recursos disponíveis para você.",
    "noreply@sistema.com",
    true
);

// --- SMS ---
$sms = new SmsNotification(
    "Maria Santos",
    "Confirmação de Pedido",
    "Seu pedido #12345 foi confirmado e será entregue em até 3 dias úteis.",
    "(11) 99999-9999"
);

// --- Push Notification ---
$push = new PushNotification(
    "Carlos Souza",
    "Nova Mensagem",
    "Você recebeu uma nova mensagem de Ana Paula.",
    "abc123xyz456token",
    "Android"
);

// Demonstração individual
echo "📧 E-MAIL" . "<br>";
echo "----------" . "<br>";
echo $email->format() . "<br>" . "<br>";
echo $email->send() . "<br>";
echo $email->log() . "<br>" . "<br>";

echo "📱 SMS" . "<br>";
echo "-------" . "<br>";
echo $sms->format() . "<br>" . "<br>";
echo $sms->send() . "<br>";
echo $sms->log() . "<br>" . "<br>";

echo "🔔 PUSH NOTIFICATION" . "<br>";
echo "----------------------" . "<br>";
echo $push->format() . "<br>" . "<br>";
echo $push->send() . "<br>";
echo $push->log() . "<br>" . "<br>";

// Polimorfismo: percorrendo diferentes notificações pela classe base Notification
echo "=== Polimorfismo: listagem de notificações ===" . "<br>";
$notifications = [$email, $sms, $push];
foreach ($notifications as $notification) {
    echo get_class($notification) . " | Assunto: " . $notification->getSubject() . "<br>";
}
