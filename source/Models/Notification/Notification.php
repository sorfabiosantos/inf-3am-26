<?php

namespace source\Models\Notification;

abstract class Notification
{
    protected string $recipient;
    protected string $subject;
    protected string $body;
    protected ?string $sentAt;

    public function __construct(string $recipient, string $subject, string $body)
    {
        $this->recipient = $recipient;
        $this->subject   = $subject;
        $this->body      = $body;
        $this->sentAt    = null;
    }

    // Getters
    public function getRecipient(): string
    {
        return $this->recipient;
    }

    public function getSubject(): string
    {
        return $this->subject;
    }

    public function getBody(): string
    {
        return $this->body;
    }

    public function getSentAt(): ?string
    {
        return $this->sentAt;
    }

    // Setters
    public function setRecipient(string $recipient): void
    {
        $this->recipient = $recipient;
    }

    public function setSubject(string $subject): void
    {
        $this->subject = $subject;
    }

    public function setBody(string $body): void
    {
        $this->body = $body;
    }

    public function setSentAt(?string $sentAt): void
    {
        $this->sentAt = $sentAt;
    }

    // Métodos abstratos — cada canal deve implementar sua própria lógica
    abstract public function send(): string;
    abstract public function format(): string;

    // Método concreto — idêntico para todos os canais
    public function log(): string
    {
        $timestamp = $this->sentAt ?? 'não enviado';
        $type      = get_class($this);
        return "[{$timestamp}] {$type} | Para: {$this->recipient} | Assunto: {$this->subject}";
    }
}