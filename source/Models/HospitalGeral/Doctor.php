<?php

namespace source\Models\HospitalGeral;

class Doctor
{
    private int    $id;
    private string $name;
    private string $email;
    private string $crm;
    private string $specialty;

    public function __construct(int $id, string $name, string $email, string $crm, string $specialty)
    {
        $this->id        = $id;
        $this->name      = $name;
        $this->email     = $email;
        $this->crm       = $crm;
        $this->specialty = $specialty;
    }

    // --- Getters ---

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getCrm(): string
    {
        return $this->crm;
    }

    public function getSpecialty(): string
    {
        return $this->specialty;
    }

    // --- Setters (apenas email e specialty — name e crm são imutáveis) ---

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setSpecialty(string $specialty): void
    {
        $this->specialty = $specialty;
    }

    // --- Exibição ---

    public function show(): string
    {
        return "Médico (Doctor): #{$this->id} - Dr(a). {$this->name}<br>" .
               "CRM (Medical License): {$this->crm}<br>" .
               "Especialidade (Specialty): {$this->specialty}<br>" .
               "E-mail: {$this->email}";
    }
}

