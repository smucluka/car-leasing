<?php
// required headers
//header('Access-Control-Allow-Origin: http://localhost:4200');
//header("Content-Type: application/json; charset=UTF-8");
//header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
//header("Access-Control-Max-Age: 86400");
//header("Access-Control-Allow-Headers: Origin, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
if (isset($_SERVER["HTTP_ORIGIN"]) === true) {
	$origin = $_SERVER["HTTP_ORIGIN"];
	$allowed_origins = array(
		"http://localhost:4200"
	);
	if (in_array($origin, $allowed_origins, true) === true) {
		header('Access-Control-Allow-Origin: ' . $origin);
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Allow-Methods: POST');
		header('Access-Control-Allow-Headers: Content-Type');
	}
	if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
		exit; // OPTIONS request wants only the policy, we can stop here
	}
}
 
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->email = $data->email;
$email_exists = $user->emailExists();

// generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;
 
// check if email exists and if password is correct
if($email_exists && password_verify($data->password, $user->password)){
 
    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       //"exp" => $expire_claim,
       "data" => array(
           "id" => $user->id,
           "firstname" => $user->firstname,
           "lastname" => $user->lastname,
           "email" => $user->email,
           "username" => $user->username
       )
    );
 
    // set response code
    http_response_code(200);
 
    // generate jwt
    $jwt = JWT::encode($token, $key);
    echo json_encode(
            array(
                "id" => $user->id,
                "firstname" => $user->firstname,
                "lastname" => $user->lastname,
                "email" => $user->email,
                "username" => $user->username,
                "jwt" => $jwt
                //"email" => $email,
                //"expireAt" => $expire_claim
            )
        );
 
}

// login failed
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user login failed
    echo json_encode(array("message" => "Login failed."));
}
?>