<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Adjusting paths: assumes phpmailer folder is outside the api folder
require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

// Set header so JavaScript knows we are sending JSON
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // SMTP Server Settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sanom6268@gmail.com'; 
        $mail->Password   = 'ptfbjqlspupjrswp';    // Your Gmail App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Sender and Receiver
        $mail->setFrom('sanom6268@gmail.com', 'Portfolio Contact');
        $mail->addAddress('regalakhing@sac.edu.ph'); // Where you want to receive emails

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = 'New Portfolio Message from ' . $_POST['name'];
        
        $name    = htmlspecialchars($_POST['name']);
        $email   = htmlspecialchars($_POST['email']);
        $message = nl2br(htmlspecialchars($_POST['message']));

        $mail->Body = "
            <div style='font-family: sans-serif; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;'>
                <h2 style='color: #2563eb;'>New Contact Form Submission</h2>
                <p><strong>Name:</strong> {$name}</p>
                <p><strong>Email:</strong> {$email}</p>
                <hr style='border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;'>
                <p><strong>Message:</strong></p>
                <p style='background: #f8fafc; padding: 15px; border-radius: 5px;'>{$message}</p>
            </div>
        ";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Message sent!"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid Request"]);
}