<?php

namespace Source\Controller;

use PDOException;
use Source\Core\Model;
use Source\Models\Genre;
use Source\Models\Publisher;
use Source\Models\Supplier;

class Catalogs extends Api
{
    public function listGenres(array $data): void
    {
        $this->respondWithCatalog(new Genre(), "Genres");
    }

    public function listSuppliers(array $data): void
    {
        $this->respondWithCatalog(new Supplier(), "Suppliers");
    }

    public function listPublishers(array $data): void
    {
        $this->respondWithCatalog(new Publisher(), "Publishers");
    }

    private function respondWithCatalog(Model $catalog, string $label): void
    {
        try {
            $this->call(200, "success", "{$label} list")->back($catalog->selectAllActive());
        } catch (PDOException $exception) {
            $this->databaseFailure($exception);
        }
    }
}
