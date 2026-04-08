<?php

namespace source\Models\Notification;

class SmsNotification extends Notification
{
    private string $phoneNumber;

    public function __construct(
        string $recipient,
        string $subject,
        string $body,
        string $phoneNumber
    ) {
        parent::__construct($recipient, $subject, $body);
        $this->phoneNumber = $phoneNumber;
    }

    // Getter e Setter
    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    public function format(): string
    {
        $bodyLimited = substr($this->body, 0, 160);
        return "SMS para: {$this->phoneNumber}\n"
             . $bodyLimited;
    }

    public function send(): string
    {
        $this->sentAt = date('Y-m-d H:i:s');
        return "📱 SMS enviado para {$this->phoneNumber} com sucesso!";
    }
}