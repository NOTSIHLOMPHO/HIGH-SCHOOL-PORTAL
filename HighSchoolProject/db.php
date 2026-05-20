<?php 
$host = "localhost"; 
$user = "NOTSI"; 
$pass = "NOTSI1234";
$db = "schoolportal"; 
$conn = new mysqli($host, $user, $pass, $db); 
if ($conn->connect_error) 
{ 
    die("Connection failed: " . $conn->connect_error
    ); 
} 
?> 
