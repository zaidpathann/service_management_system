<?php
header('Content-Type: application/json');
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];
    
    // Validate input
    if (empty($name) || empty($email) || empty($phone) || empty($address)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Check if email already exists
    $check_stmt = $conn->prepare("SELECT id FROM customers WHERE email = ?");
    $check_stmt->bind_param("s", $email);
    $check_stmt->execute();
    $check_stmt->store_result();
    
    if ($check_stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already exists']);
        $check_stmt->close();
        exit;
    }
    $check_stmt->close();
    
    // Insert new customer
    $stmt = $conn->prepare("INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $address);
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Customer added successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error adding customer: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>