<?php

namespace Source\Models;

use Source\Core\Model;

class Publisher extends Model
{
    private ?int $id = null;
    private ?string $name = null;
    private int $active = 1;

    public function __construct()
    {
        $this->table = "publishers";
        $this->fillable = ["name", "active"];
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
            throw new \InvalidArgumentException("The publisher name is required.");
        }
        $this->name = $name;
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
