<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
$message = trim((string)($payload['message'] ?? ''));

if ($message === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Message is required']);
    exit;
}

$portfolioOnlyReply = 'I can only answer questions about Khing Jay Regala\'s portfolio, such as projects, skills, background, and contact details.';

$keywords = [
    'portfolio', 'project', 'projects', 'all projects', 'skill', 'skills', 'tech', 'stack', 'about', 'about me', 'all about', 'background',
    'contact', 'email', 'phone', 'location', 'khing', 'jay', 'regala', 'certificate', 'award',
    'physiquecheck', 'smartchoice', 'passgenai', 'studentwellnessguard', 'venus', 'details', 'everything', 'full profile'
];

$lowerMessage = strtolower($message);
$isPortfolioQuery = false;
foreach ($keywords as $keyword) {
    if (strpos($lowerMessage, $keyword) !== false) {
        $isPortfolioQuery = true;
        break;
    }
}

if (!$isPortfolioQuery) {
    echo json_encode(['status' => 'success', 'reply' => $portfolioOnlyReply]);
    exit;
}

$apiKey = getenv('GROQ_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Groq API key is not configured on server']);
    exit;
}

$portfolioData = <<<TXT
Name: Khing Jay Regala
Role: IT student and aspiring full stack / web developer
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique

About:
Khing Jay is a creative and multidisciplinary IT student focused on building practical web applications and continuously improving through real projects.

Core Skills:
Java, Python, JavaScript, C#, HTML, CSS, React, Tailwind CSS, Git, GitHub, NetBeans, VS Code, PyCharm, XAMPP, Supabase

Projects:
1) PhysiqueCheck
Description: A web physique tracking app that uses body photos to analyze muscles and generate personalized workouts and meal guides.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: https://physique-check-git-main-kaisecrets-projects.vercel.app?_vercel_share=eCic6DLuiV43DfRx80clkvsapYbuWYfZ
Source: https://github.com/Kaisecret/PhisiqueCheck-AI-COACH-ASSISTANT-FOR-BODY

2) SMARTCHOICE
Description: A web course-planning app that analyzes SHS strand, interests, and skills to recommend best-fit college programs and paths.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: Not available
Source: Not available

3) String Builder Portflio
Description: A desktop portfolio and resume generator for students applying for jobs and internships.
Tech: Neatbens, MySQL, java, Xampp
Demo: Not available
Source: Not available

4) PassGenAI
Description: An AI-powered password generator that creates secure and memorable passwords.
Tech: React, Tailwind, Supabase
Demo: https://passgen-ai-murex.vercel.app/
Source: https://github.com/Kaisecret/PassgenAi

5) StudentWellnessGuard
Description: An AI-powered tool that analyzes facial cues to detect early signs of fatigue and stress.
Tech: Php, MySQL, Python, Tailwind, Pycharm, Vscode, Xampp
Demo: Not available
Source: Not available

6) ILOVE YOU VENUS
Description: A simple anniversary website with games, pictures, a heartfelt letter, and a virtual garden.
Tech: JavaScript, HTML5, Tailwind
Demo: https://kaisecret.github.io/happy_anniversary/home.html
Source: https://github.com/Kaisecret/happy_anniversary
TXT;

$systemPrompt = "You are a strict portfolio assistant for Khing Jay Regala. Only answer questions related to this portfolio data. If user asks for all about/about me/full profile/all projects, provide complete details (contact info, about, and every project with description, tech, and links). If the question is unrelated, reply exactly with: I can only answer questions about Khing Jay Regala's portfolio, such as projects, skills, background, and contact details. Keep responses concise and factual.\n\nPortfolio Data:\n" . $portfolioData;

$requestBody = [
    'model' => 'llama-3.3-70b-versatile',
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $message]
    ],
    'temperature' => 0.2,
    'max_tokens' => 320
];

$encodedBody = json_encode($requestBody);
$headers = [
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
];

$response = false;
$status = 0;

if (function_exists('curl_init')) {
    $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $encodedBody,
        CURLOPT_TIMEOUT => 30
    ]);

    $response = curl_exec($ch);
    $curlError = curl_error($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $curlError) {
        $response = false;
    }
}

if ($response === false) {
    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => implode("\r\n", $headers),
            'content' => $encodedBody,
            'timeout' => 30,
            'ignore_errors' => true
        ]
    ]);

    $response = @file_get_contents('https://api.groq.com/openai/v1/chat/completions', false, $context);
    $status = 0;

    if (isset($http_response_header) && is_array($http_response_header)) {
        foreach ($http_response_header as $line) {
            if (preg_match('/HTTP\/\S+\s+(\d{3})/', $line, $matches)) {
                $status = (int) $matches[1];
                break;
            }
        }
    }
}

if ($response === false) {
    http_response_code(502);
    echo json_encode(['status' => 'error', 'message' => 'Unable to reach Groq API']);
    exit;
}

$data = json_decode($response, true);
if ($status < 200 || $status >= 300) {
    $apiMessage = $data['error']['message'] ?? 'Groq API error';
    http_response_code($status ?: 500);
    echo json_encode(['status' => 'error', 'message' => $apiMessage]);
    exit;
}

$reply = trim((string)($data['choices'][0]['message']['content'] ?? ''));
if ($reply === '') {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Empty response from Groq']);
    exit;
}

echo json_encode(['status' => 'success', 'reply' => $reply]);
