<?php
header('Content-Type: application/json');
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $service_id = $_POST['service_id'];
    $status = $_POST['status'];
    
    // Validate input
    if (empty($service_id) || empty($status)) {
        echo json_encode(['success' => false, 'message' => 'Service ID and status are required']);
        exit;
    }
    
    // Update service status
    $stmt = $conn->prepare("UPDATE services SET status = ? WHERE id = ?");
    $stmt->bind_param("si", $status, $service_id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Service status updated successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No service found with that ID']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error updating service: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>