<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Paths for Vercel deployment
require '../phpmailer/src/Exception.php';
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/SMTP.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mail = new PHPMailer(true);

    try {
        // --- SERVER SETTINGS ---
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        
        // Credentials
        $mail->Username   = 'sanom6268@gmail.com'; 
        $mail->Password   = 'ptfbjqlspupjrswp'; // Your 16-char App Password
        
        // Encryption & Port
        // Port 465 + SMTPS is often more reliable on cloud hosting than 587
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port       = 465;

        // --- SSL FIX FOR CLOUD HOSTING ---
        // This prevents "SMTP connect() failed" errors on many servers
        $mail->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            )
        );

        // --- RECIPIENTS ---
        $mail->setFrom('sanom6268@gmail.com', 'Portfolio Contact');
        $mail->addAddress('regalakhing@sac.edu.ph'); 

        // --- CONTENT ---
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
        echo json_encode(["status" => "success", "message" => "Mail sent"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid Request"]);
}