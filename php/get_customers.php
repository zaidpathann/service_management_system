<?php
header('Content-Type: application/json');
include 'config.php';

$sql = "SELECT id, name, email, phone, address, created_at FROM customers ORDER BY created_at DESC";
$result = $conn->query($sql);

$customers = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
}

echo json_encode($customers);
$conn->close();
?>