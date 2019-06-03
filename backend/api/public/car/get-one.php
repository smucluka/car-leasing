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

// files needed to connect to database
include_once '../../config/database.php';
include_once '../../objects/car.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

//instantiate car object
$car = new Car($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set product property values
$car->id = $data->id;

//query car
$car_exists = $car->readById();

if($car_exists){

    // set response code
    http_response_code(200);

    echo json_encode(
        array(
            "id"=>$car->id,
            "marka_id"=>$car->marka_id,
            "marka"=>utf8_encode($car->marka),
            "model"=>utf8_encode($car->model),
            "godina_proizvodnje"=>$car->godina_proizvodnje,
            "godina_modela"=>$car->godina_modela,
            "kilometraza"=>$car->kilometraza,
            "motor"=>utf8_encode($car->motor),
            "snaga_motora"=>$car->snaga_motora,
            "radni_obujam"=>$car->radni_obujam,
            "mjenjac"=>utf8_encode($car->mjenjac),
            "broj_stupnjeva"=>$car->broj_stupnjeva,
            "potrosnja_goriva"=>$car->potrosnja_goriva,
            "stanje_vozila"=>utf8_encode($car->stanje_vozila),
            "lokacija_vozila"=>utf8_encode($car->lokacija_vozila),
            "vlasnik"=>utf8_encode($car->vlasnik),
            "garaziran"=>$car->garaziran,
            "broj_vrata"=>$car->broj_vrata,
            "broj_sjedala"=>$car->broj_sjedala,
            "boja"=>utf8_encode($car->boja),
            "vrsta_pogona"=>utf8_encode($car->vrsta_pogona),
            "dodatna_oprema"=>utf8_encode($car->dodatna_oprema)
        )
    );
}        

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "Car not found.")
    );
}
?>