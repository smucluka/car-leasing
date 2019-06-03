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
include_once '../../objects/dodatna_oprema.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

//instantiate dodatnaOprema object
$dodatnaOprema = new DodatnaOprema($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
        
//query
$stmt = $dodatnaOprema->readAvailable();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

    //dodatnaOprema array
    $dodatnaOprema_arr=array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);

        $dodatnaOprema_item=array(
            "id"=>$id,
            "name"=>$name
        );
        
        array_push($dodatnaOprema_arr, $dodatnaOprema_item);
    }

    // set response code - 200 OK
    http_response_code(200);

    // show products data in json format
    echo json_encode($dodatnaOprema_arr);
}

else{

    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(
        array("message" => "Nothing found.")
    );
}
    

?>