<?php

namespace Source\Models;

use Source\Core\Model;

class Supplier extends Model
{
    private ?int $id = null;
    private ?string $name = null;
    private ?string $email = null;
    private ?string $phone = null;
    private int $active = 1;

    public function __construct()
    {
        $this->table = "suppliers";
        $this->fillable = ["name", "email", "phone", "active"];
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $name = trim($name);
        if ($name === "") {
            throw new \InvalidArgumentException("The supplier name is required.");
        }
        $this->name = $name;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $email = trim($email);
        if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
            throw new \InvalidArgumentException("A valid supplier email is required.");
        }
        $this->email = $email;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): void
    {
        $phone = trim($phone);
        if ($phone === "") {
            throw new \InvalidArgumentException("The supplier phone is required.");
        }
        $this->phone = $phone;
    }

    public function getActive(): int
    {
        return $this->active;
    }

    public function setActive(int $active): void
    {
        $this->active = $active === 1 ? 1 : 0;
    }
}
