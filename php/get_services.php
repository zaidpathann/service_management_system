<?php
header('Content-Type: application/json');
include 'config.php';

$sql = "SELECT id, customer_id, customer_name, service_type, description, priority, status, date, created_at 
        FROM services ORDER BY created_at DESC";
$result = $conn->query($sql);

$services = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $services[] = $row;
    }
}

echo json_encode($services);
$conn->close();
?>