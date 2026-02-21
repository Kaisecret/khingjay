<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

require __DIR__ . '/../phpmailer/src/Exception.php';
require __DIR__ . '/../phpmailer/src/PHPMailer.php';
require __DIR__ . '/../phpmailer/src/SMTP.php';

$raw = file_get_contents('php://input');
if (!empty($raw)) {
    $json = json_decode($raw, true);
    if (is_array($json)) {
        foreach ($json as $k => $v) {
            if (!isset($_POST[$k])) $_POST[$k] = $v;
        }
    }
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
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

$gmailUserRaw = getenv('GMAIL_USERNAME') ?: 'sanom6268@gmail.com';
$gmailPassRaw = getenv('GMAIL_APP_PASSWORD') ?: 'zqwa lxgv bmue zyqs';

// Gmail app passwords are often copied with spaces like "abcd efgh ijkl mnop".
$gmailUser = trim($gmailUserRaw);
$gmailPass = str_replace(' ', '', trim($gmailPassRaw));
$toEmail = trim(getenv('MAIL_TO') ?: 'regalakhing@sac.edu.ph');

if ($gmailUser === '' || $gmailPass === '') {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Server email credentials are not configured. Add GMAIL_USERNAME and GMAIL_APP_PASSWORD in Vercel env vars."
    ]);
    exit;
}

if (!filter_var($gmailUser, FILTER_VALIDATE_EMAIL)) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "GMAIL_USERNAME is invalid. It must be a Gmail address."
    ]);
    exit;
}

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));

$attempts = [
    ['secure' => PHPMailer::ENCRYPTION_SMTPS, 'port' => 465],
    ['secure' => PHPMailer::ENCRYPTION_STARTTLS, 'port' => 587],
];

$lastError = '';

foreach ($attempts as $smtp) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $gmailUser;
        $mail->Password = $gmailPass;
        $mail->SMTPSecure = $smtp['secure'];
        $mail->Port = $smtp['port'];
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($gmailUser, 'Portfolio Contact');
        $mail->addAddress($toEmail);
        $mail->addReplyTo($email, $name);

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
        $mail->AltBody = "New message\n\nName: {$name}\nEmail: {$email}\n\nMessage:\n{$message}";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Mail sent"]);
        exit;
    } catch (Exception $e) {
        $lastError = $mail->ErrorInfo ?: $e->getMessage();
    }
}

http_response_code(500);
echo json_encode([
    "status" => "error",
    "message" => "Mailer authentication failed. Re-check GMAIL_USERNAME and Gmail App Password in Vercel env vars.",
    "details" => $lastError
]);
