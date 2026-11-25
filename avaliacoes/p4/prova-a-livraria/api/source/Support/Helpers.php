<?php

function isPositiveInteger(mixed $value): bool
{
    return filter_var($value, FILTER_VALIDATE_INT) !== false && (int)$value > 0;
}
