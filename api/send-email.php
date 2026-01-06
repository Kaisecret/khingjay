<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// --- Load PHPMailer (use __DIR__ so paths work on Vercel) ---
require __DIR__ . '/../phpmailer/src/Exception.php';
require __DIR__ . '/../phpmailer/src/PHPMailer.php';
require __DIR__ . '/../phpmailer/src/SMTP.php';

// --- Accept JSON or FormData ---
// If you send JSON from fetch(), $_POST will be empty unless we decode it.
$raw = file_get_contents('php://input');
if (!empty($raw)) {
    $json = json_decode($raw, true);
    if (is_array($json)) {
        // Merge JSON into $_POST
        foreach ($json as $k => $v) {
            if (!isset($_POST[$k])) $_POST[$k] = $v;
        }
    }
}

// --- Validate inputs ---
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid email"]);
    exit;
}

// --- Read credentials from environment variables (Vercel settings) ---
$gmailUser = getenv('GMAIL_USERNAME');
$gmailPass = getenv('GMAIL_APP_PASSWORD');
$toEmail   = getenv('MAIL_TO') ?: 'regalakhing@sac.edu.ph'; // fallback if env not set

if (!$gmailUser || !$gmailPass) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server email credentials are not configured (missing env vars)."
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {
    // --- SMTP settings ---
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $gmailUser;
    $mail->Password   = $gmailPass;

    // Prefer SMTPS on 465
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    // OPTIONAL DEBUG (enable only while testing on Vercel)
    // $mail->SMTPDebug = 2;
    // $mail->Debugoutput = 'error_log';

    // --- Recipients ---
    $mail->setFrom($gmailUser, 'Portfolio Contact');
    $mail->addAddress($toEmail);

    // Optional: reply directly to sender
    $mail->addReplyTo($email, $name);

    // --- Email content ---
    $safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $safeEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

    $mail->isHTML(true);
    $mail->Subject = "New Portfolio Message from {$safeName}";
    $mail->Body = "
        <div style='font-family: Arial, sans-serif; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;'>
            <h2 style='color: #2563eb; margin-top:0;'>New Contact Form Submission</h2>
            <p><strong>Name:</strong> {$safeName}</p>
            <p><strong>Email:</strong> {$safeEmail}</p>
            <hr style='border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;'>
            <p><strong>Message:</strong></p>
            <p style='background: #f8fafc; padding: 15px; border-radius: 8px; margin:0;'>{$safeMessage}</p>
        </div>
    ";

    // Plain text fallback
    $mail->AltBody = "New message\n\nName: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

    $mail->send();

    echo json_encode(["status" => "success", "message" => "Mail sent"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Mailer Error: " . $mail->ErrorInfo
    ]);
}
