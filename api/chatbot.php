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

$apiKey = getenv('GROQ_API_KEY');
if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Groq API key is not configured on server']);
    exit;
}

$portfolioData = <<<TXT
Name: Khing Jay Regala
Role: Full stack developer with an AI-driven workflow
Email: regalakhing@sac.edu.ph
Phone: 09382604239
Location: Mapatag Hamtic Antique

About:
Khing Jay is a full stack developer with an AI-driven workflow who enjoys solving problems, is always willing to learn, and collaborates well with a team. Khing Jay specializes in databases, AI workflows, and automation.

Core Skills:
Java, Python, JavaScript, C#, Dart, HTML, CSS, React, Next.js, Tailwind CSS, Flutter, Git, GitHub, NetBeans, VS Code, PyCharm, XAMPP, Supabase, Claude, Codex, Antigravity

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

3) ORR Beach Resort
Description: A responsive website for ORR Beach Resort in Banawon, Hamtic, Antique showing its rooms, amenities, dining, gallery, booking inquiries, and map location.
Tech: HTML, CSS, Tailwind CSS, JavaScript, Vercel
Demo: https://orr-beach-resort-website.vercel.app/
Source: Not available

4) WattSnap AI
Description: A home electricity assistant for households in Antique. It reads electricity bills, estimates appliance energy use, gives Tipid Tips, tracks a Smart Energy Budget, and matches ANTECO brownout advisories to the household barangay, with saved information available offline.
Awards: Champion, Industry-Ready Team, and Best Pitch at the Cyberian 2.0 Hackathon (October 13, 2026), judged by a panel that included Bryl Lim.
Team: Team 3AM Engineers. Khing Jay Regala was the lead developer.
Tech: Next.js, React, TypeScript, Supabase, Vercel
Demo: https://www.wattsnapai.dev/
Source: Not available
TXT;

$systemPrompt = "You are an AI assistant on Khing Jay Regala's portfolio website. You can answer general questions and portfolio questions. Use the portfolio data below when relevant.\n\nImportant behavior rules:\n1) If user asks for Khing's location, provide: Mapatag Hamtic Antique.\n2) If user asks for YOUR location / AI location, say you do not have a physical location.\n3) Do not confuse AI location with Khing's location.\n4) Be concise and clear.\n\nPortfolio Data:\n" . $portfolioData;

$requestBody = [
    'model' => 'llama-3.3-70b-versatile',
    'messages' => [
        ['role' => 'system', 'content' => $systemPrompt],
        ['role' => 'user', 'content' => $message]
    ],
    'temperature' => 0.3,
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
