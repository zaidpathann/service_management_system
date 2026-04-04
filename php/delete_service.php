<?php
header('Content-Type: application/json');
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $service_id = $_POST['service_id'];
    
    // Validate input
    if (empty($service_id)) {
        echo json_encode(['success' => false, 'message' => 'Service ID is required']);
        exit;
    }
    
    // Delete service
    $stmt = $conn->prepare("DELETE FROM services WHERE id = ?");
    $stmt->bind_param("i", $service_id);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(['success' => true, 'message' => 'Service deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No service found with that ID']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Error deleting service: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>