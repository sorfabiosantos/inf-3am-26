<?php

namespace source\Models\Notification;

class PushNotification extends Notification
{
    private string $deviceToken;
    private string $platform;

    public function __construct(
        string $recipient,
        string $subject,
        string $body,
        string $deviceToken,
        string $platform
    ) {
        parent::__construct($recipient, $subject, $body);
        $this->deviceToken = $deviceToken;
        $this->platform    = $platform;
    }

    // Getters e Setters
    public function getDeviceToken(): string
    {
        return $this->deviceToken;
    }

    public function setDeviceToken(string $deviceToken): void
    {
        $this->deviceToken = $deviceToken;
    }

    public function getPlatform(): string
    {
        return $this->platform;
    }

    public function setPlatform(string $platform): void
    {
        $this->platform = $platform;
    }

    public function format(): string
    {
        $bodyLimited  = substr($this->body, 0, 100);
        $tokenPreview = substr($this->deviceToken, 0, 10) . '...';
        return "Push Notification | Plataforma: {$this->platform}\n"
             . "Título: {$this->subject}\n"
             . "Mensagem: {$bodyLimited}\n"
             . "Token: {$tokenPreview}";
    }

    public function send(): string
    {
        $this->sentAt = date('Y-m-d H:i:s');
        return "🔔 Push Notification enviada para dispositivo {$this->platform} com sucesso!";
    }
}