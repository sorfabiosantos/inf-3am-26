<?php

namespace source\Models\Notification;

class EmailNotification extends Notification
{
    private string $senderEmail;
    private bool $isHtml;

    public function __construct(
        string $recipient,
        string $subject,
        string $body,
        string $senderEmail,
        bool   $isHtml = true
    )
    {
        parent::__construct($recipient, $subject, $body);
        $this->senderEmail = $senderEmail;
        $this->isHtml = $isHtml;
    }

    // Getters e Setters
    public function getSenderEmail(): string
    {
        return $this->senderEmail;
    }

    public function setSenderEmail(string $senderEmail): void
    {
        $this->senderEmail = $senderEmail;
    }

    public function isHtml(): bool
    {
        return $this->isHtml;
    }

    public function setIsHtml(bool $isHtml): void
    {
        $this->isHtml = $isHtml;
    }

    public function format(): string
    {
        $format = $this->isHtml ? 'HTML' : 'Texto Simples';
        return "De: {$this->senderEmail}\n"
            . "Para: {$this->recipient}\n"
            . "Assunto: {$this->subject}\n"
            . "Formato: {$format}\n"
            . "---\n"
            . $this->body;
    }

    public function send(): string
    {
        $this->sentAt = date('Y-m-d H:i:s');
        return "✉ E-mail enviado para {$this->recipient} com sucesso!";
    }
}