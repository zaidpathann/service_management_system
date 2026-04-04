<?php
header('Content-Type: application/json');
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $customer_id = $_POST['customer_id'];
    $service_type = $_POST['service_type'];
    $description = $_POST['description'];
    $priority = $_POST['priority'];
    
    // Validate input
    if (empty($customer_id) || empty($service_type) || empty($description) || empty($priority)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Get customer name
    $customer_stmt = $conn->prepare("SELECT name FROM customers WHERE id = ?");
    $customer_stmt->bind_param("i", $customer_id);
    $customer_stmt->execute();
    $customer_stmt->bind_result($customer_name);
    $customer_stmt->fetch();
    $customer_stmt->close();
    
    if (!$customer_name) {
        echo json_encode(['success' => false, 'message' => 'Customer not found']);
        exit;
    }
    
    // Insert new service
    $current_date = date('Y-m-d');
    $stmt = $conn->prepare("INSERT INTO services (customer_id, customer_name, service_type, description, priority, date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("isssss", $customer_id, $customer_name, $service_type, $description, $priority, $current_date);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Service request added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding service: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>