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
        header('Access-Control-Allow-Methods: GET');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        header("Content-Type: application/json; charset=UTF-8");
	}
	if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
		exit; // OPTIONS request wants only the policy, we can stop here
	}
}

// files needed to connect to database
include_once '../../config/database.php';
include_once '../../objects/vozilo.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

//instantiate car object
$car = new Vozilo($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
        
//query cars
$stmt = $car->readAll();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    //cars array
    $cars_arr=array();
    //$cars_arr["records"]=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $car_item=array(
            "id"=>$id,
            "marka_id"=>$marka_id,
            "marka"=>utf8_encode($marka),
            "model"=>utf8_encode($model),
            "godina_proizvodnje"=>$godina_proizvodnje,
            "godina_modela"=>$godina_modela,
            "kilometraza"=>$kilometraza,
            "motor"=>utf8_encode($motor),
            "snaga_motora"=>$snaga_motora,
            "radni_obujam"=>$radni_obujam,
            "mjenjac"=>utf8_encode($mjenjac),
            "broj_stupnjeva"=>$broj_stupnjeva,
            "potrosnja_goriva"=>$potrosnja_goriva,
            "stanje_vozila"=>utf8_encode($stanje_vozila),
            "lokacija_vozila"=>utf8_encode($lokacija_vozila),
            "vlasnik"=>utf8_encode($vlasnik),
            "garaziran"=>$garaziran,
            "broj_vrata"=>$broj_vrata,
            "broj_sjedala"=>$broj_sjedala,
            "boja"=>utf8_encode($boja),
            "vrsta_pogona"=>utf8_encode($vrsta_pogona)
        );
        
        //array_push($cars_arr["records"], $car_item);
        array_push($cars_arr, $car_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($cars_arr);
}

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "No cars found.")
    );
}
    

?>