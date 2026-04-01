<?php

abstract class PaymentMethod
{
    protected ?float $amount;

    public function __construct(?float $amount = null)
    {
        $this->amount = $amount;
    }

    public function displayAmount(): string
    {
        return "Pagamento: R$ " . number_format($this->amount, 2, ',', '.');
    }
    
    abstract public function process();
    abstract public function redirect();

}



class PixPayment extends PaymentMethod
{
    public function process(): string
    {
        return "Gerando o QR-code para R$ {$this->amount}... PIX realizado com sucesso!";
    }

    public function redirect(): string
    {
        return "Redirecionando para página do PIX";
    }

}

class CardPayment extends PaymentMethod
{
    public function process(): string
    {
        return "Conectando... Pagamento R$ {$this->amount} realizado com sucesso!";
    }

    public function redirect(): string
    {
        return "Redirecionando para página da Operadora do Cartão de Crédito";
    }

}
// não pode, classes abstratas não podem ser instanciadas
// $payment = new PaymentMethod();

$pix = new PixPayment(150);
echo $pix->displayAmount() . "<br>";
echo $pix->process() . "<br><br>";
echo $pix->redirect() . "<br><br>";

$card = new CardPayment(2500.50);
echo $card->displayAmount() . "<br>";
echo $card->process() . "<br><br>";
echo $card->redirect() . "<br><br>";
