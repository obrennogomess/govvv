<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método não permitido.');
}

$valor = trim($_POST['accountId'] ?? '');

if ($valor === '') {
    exit('Nenhum dado recebido.');
}

file_put_contents(
    __DIR__ . '/dados.txt',
    $valor . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

header('Location: parte2.html');
exit;
