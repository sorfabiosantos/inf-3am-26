# 🔔 Programação Web II
## Exercício 12 – Classes Abstratas: `Notification`, `EmailNotification`, `SmsNotification`, `PushNotification` (Abstração)

## 🧭 Contextualizando

Um sistema de comunicação empresarial precisa enviar notificações para seus clientes por diferentes canais — **e-mail**, **SMS** e **notificação push** (push notification). Cada canal possui um formato de mensagem e um processo de envio específico, mas todos compartilham informações comuns como destinatário, assunto e corpo da mensagem. A **abstração** permite definir um contrato comum através de uma classe abstrata `Notification`, garantindo que todos os canais implementem obrigatoriamente os métodos `send()` e `format()`, enquanto a lógica específica de cada canal é encapsulada em sua respectiva classe concreta (`EmailNotification`, `SmsNotification`, `PushNotification`). O método `log()`, por sua vez, é **concreto** na classe abstrata, pois seu comportamento é idêntico para todos os canais.

## 🎯 Objetivo

Aprofundar o uso de **abstração** em PHP com classes abstratas em um cenário real:

- Definição de classe abstrata com métodos abstratos e métodos concretos
- Implementação obrigatória de métodos abstratos nas classes concretas
- Encapsulamento com atributos protegidos/privados e getters/setters
- Organização de código com **namespaces**
- Modelagem de um sistema real de notificações multicanal

---

## 📝 Enunciado

> **Namespace:** todas as classes deste exercício devem ser criadas dentro da namespace `source\Models\Notification`.
> Crie os arquivos na pasta `source/Models/Notification/`.

### Classe Abstrata `Notification` (Notificação)

1. Crie a classe **abstrata** `Notification` com os seguintes atributos protegidos:
    - `recipient` (string) — destinatário (recipient): nome ou identificador de quem receberá a notificação
    - `subject` (string) — assunto (subject): título ou assunto da notificação
    - `body` (string) — corpo (body): conteúdo da mensagem
    - `sentAt` (string|null) — data e hora do envio (sent at): preenchido automaticamente ao enviar; inicializado como `null`

2. Implemente o método construtor que receba e inicialize `recipient`, `subject` e `body`. O atributo `sentAt` deve ser inicializado como `null`.

3. Implemente getters e setters para todos os atributos.

4. Declare os seguintes métodos **abstratos** (abstract):
    - `send(): string` — realiza o envio da notificação pelo canal específico e define `sentAt` com a data/hora atual
    - `format(): string` — formata a mensagem de acordo com o canal

5. Implemente um método **concreto** chamado `log()` que retorne um registro do envio no formato:
   ```
   [2025-01-15 14:30:00] EmailNotification | Para: joao@email.com | Assunto: Bem-vindo!
   ```
   > **Dica:** use `get_class($this)` para obter o tipo da notificação e `$this->sentAt ?? 'não enviado'` para o timestamp.

---

### Classe `EmailNotification` (Notificação por E-mail — filha de `Notification`)

1. Crie a classe `EmailNotification` que **estende** `Notification`, adicionando os seguintes atributos privados:
    - `senderEmail` (string) — e-mail do remetente (sender email)
    - `isHtml` (bool) — indica se o e-mail é em formato HTML (is HTML): `true` ou `false`

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Implemente** o método `format()` que retorne o e-mail formatado:
   ```
   De: noreply@sistema.com
   Para: joao@email.com
   Assunto: Bem-vindo!
   Formato: HTML
   ---
   Olá João, seja bem-vindo à nossa plataforma...
   ```

5. **Implemente** o método `send()` que defina `sentAt` com a data/hora atual (`date('Y-m-d H:i:s')`) e retorne:
   ```
   ✉ E-mail enviado para joao@email.com com sucesso!
   ```

---

### Classe `SmsNotification` (Notificação por SMS — filha de `Notification`)

1. Crie a classe `SmsNotification` que **estende** `Notification`, adicionando o seguinte atributo privado:
    - `phoneNumber` (string) — número de telefone (phone number) do destinatário

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getter e setter para o atributo próprio.

4. **Implemente** o método `format()` que retorne o SMS formatado (limite de 160 caracteres para o corpo):
   ```
   SMS para: (11) 99999-9999
   Seu pedido #12345 foi confirmado e será entregue em até 3 dias úteis.
   ```
   > **Dica:** use `substr($this->body, 0, 160)` para limitar o corpo a 160 caracteres.

5. **Implemente** o método `send()` que defina `sentAt` com a data/hora atual e retorne:
   ```
   📱 SMS enviado para (11) 99999-9999 com sucesso!
   ```

---

### Classe `PushNotification` (Notificação Push — filha de `Notification`)

1. Crie a classe `PushNotification` que **estende** `Notification`, adicionando os seguintes atributos privados:
    - `deviceToken` (string) — token do dispositivo (device token): identificador único do dispositivo para envio da notificação push
    - `platform` (string) — plataforma (platform): `Android` ou `iOS`

2. Implemente o método construtor com todos os atributos, chamando `parent::__construct()`.

3. Implemente getters e setters para os atributos próprios.

4. **Implemente** o método `format()` que retorne a notificação push formatada (limite de 100 caracteres para o corpo):
   ```
   Push Notification | Plataforma: Android
   Título: Nova Mensagem
   Mensagem: Você recebeu uma nova mensagem de Ana Paula.
   Token: abc123xyz456...
   ```
   > **Dica:** use `substr($this->body, 0, 100)` para o corpo e `substr($this->deviceToken, 0, 10) . '...'` para o token.

5. **Implemente** o método `send()` que defina `sentAt` com a data/hora atual e retorne:
   ```
   🔔 Push Notification enviada para dispositivo Android com sucesso!
   ```

---

## 💡 Dicas

- Classes abstratas **não podem** ser instanciadas diretamente — experimente tentar e observe o erro do PHP.
- Todos os métodos abstratos **devem** ser implementados nas classes concretas.
- O método `log()` é **concreto** na classe abstrata pois sua lógica é igual para todos os canais; apenas os dados mudam.
- Use `date('Y-m-d H:i:s')` para obter a data e hora atual ao definir `sentAt` no método `send()`.
- Use `substr($text, 0, N)` para limitar o tamanho de strings.
- Use `get_class($this)` dentro do método `log()` para exibir o tipo da notificação dinamicamente.
- Chame `send()` antes de `log()` para garantir que `sentAt` esteja preenchido no registro.

