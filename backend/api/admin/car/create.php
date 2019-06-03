<?php
// required headers
if (isset($_SERVER["HTTP_ORIGIN"]) === true) {
	$origin = $_SERVER["HTTP_ORIGIN"];
	$allowed_origins = array(
		"http://localhost:4200"
	);
	if (in_array($origin, $allowed_origins, true) === true) {
		header('Access-Control-Allow-Origin: ' . $origin);
		header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header("Content-Type: application/json; charset=UTF-8");
	}
	if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
		exit; // OPTIONS request wants only the policy, we can stop here
	}
}

// required to encode json web token
include_once '../../config/core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../../config/database.php';
include_once '../../config/core.php';
include_once '../../objects/car.php';



// get database connection
$database = new Database();
$db = $database->getConnection();

//instantiate car object
$car = new Car($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

//get authorization header
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$headers = null;
if (isset($_SERVER['Authorization'])) {
    $headers = trim($_SERVER["Authorization"]);
}
else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
    $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
} elseif (function_exists('apache_request_headers')) {
    $requestHeaders = apache_request_headers();
    // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
    $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
    if (isset($requestHeaders['Authorization'])) {
        $headers = trim($requestHeaders['Authorization']);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////         
$authHeader = $headers;
$arr = explode(" ", $authHeader);
$jwt = $arr[1];

// if jwt is not empty
if($jwt){

    // if decode succeed, show user details
    try {

        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        
        // Access is granted. Add code of the operation here 
        
        // set product property values
        $car->marka_id = $data->marka_id;
        $car->model = $data->model;
        $car->godina_proizvodnje = $data->godina_proizvodnje;
        $car->godina_modela = $data->godina_modela;
        $car->kilometraza = $data->kilometraza;
        $car->motor = $data->motor;
        $car->snaga_motora = $data->snaga_motora;
        $car->radni_obujam = $data->radni_obujam;
        $car->mjenjac = $data->mjenjac;
        $car->broj_stupnjeva = $data->broj_stupnjeva;
        $car->potrosnja_goriva = $data->potrosnja_goriva;
        $car->stanje_vozila = $data->stanje_vozila;
        $car->lokacija_vozila = $data->lokacija_vozila;
        $car->vlasnik = $data->vlasnik;
        $car->garaziran = $data->garaziran;
        $car->broj_vrata = $data->broj_vrata;
        $car->broj_sjedala = $data->broj_sjedala;
        $car->boja = $data->boja;
        $car->vrsta_pogona = $data->vrsta_pogona;
        $car->dodatna_oprema = $data->dodatna_oprema;


        /*
        * List of file names to be filled in by the upload script 
        * below and to be saved in the db table "slika" afterwards.
        */
        $filenamesToSave = [];
        $allowedMimeTypes = explode(',', UPLOAD_ALLOWED_MIME_TYPES);
        // upload files
        if (!empty($_FILES)) {
            if (isset($_FILES['file']['error'])) {
                foreach ($_FILES['file']['error'] as $uploadedFileKey => $uploadedFileError) {
                    if ($uploadedFileError === UPLOAD_ERR_NO_FILE) {
                        $errors[] = 'You did not provide any files.';
                    } elseif ($uploadedFileError === UPLOAD_ERR_OK) {
                        $uploadedFileName = basename($_FILES['file']['name'][$uploadedFileKey]);
    
                        if ($_FILES['file']['size'][$uploadedFileKey] <= UPLOAD_MAX_FILE_SIZE) {
                            $uploadedFileType = $_FILES['file']['type'][$uploadedFileKey];
                            $uploadedFileTempName = $_FILES['file']['tmp_name'][$uploadedFileKey];
    
                            $uploadedFilePath = rtrim(UPLOAD_DIR, '/') . '/' . $uploadedFileName;
    
                            if (in_array($uploadedFileType, $allowedMimeTypes)) {
                                if (!move_uploaded_file($uploadedFileTempName, $uploadedFilePath)) {
                                    $errors[] = 'The file "' . $uploadedFileName . '" could not be uploaded.';
                                } else {
                                    $filenamesToSave[] = $uploadedFilePath;
                                    $car->filenamesToSave = $filenamesToSave;
                                }
                            } else {
                                $errors[] = 'The extension of the file "' . $uploadedFileName . '" is not valid. Allowed extensions: JPG, JPEG, PNG, or GIF.';
                            }
                        } else {
                            $errors[] = 'The size of the file "' . $uploadedFileName . '" must be of max. ' . (UPLOAD_MAX_FILE_SIZE / 1024) . ' KB';
                        }
                    }
                }
            }
        }



        if($car->insert()){

            // set response code
            http_response_code(200);

            echo json_encode(
                array(
                    "message" => "Car successfully added."
                )
            );
        }        

        else{
        
            // set response code - 404 Not found
            http_response_code(404);
        
            // tell the user no products found
            echo json_encode(
                array("message" => "Unable to add car.")
            );
        }
    }

    // if decode fails, it means jwt is invalid
    catch (Exception $e){
    
        // set response code
        http_response_code(401);
    
        // show error message
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }

}

// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
?>