<?php
// 'car' object
class Car{

    // database connection and table name
    private $conn;
    private $table_name = "car";

    // object properties
    public $id;
    public $manufacturer;
    public $model;
    public $year;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // read all cars
    function readAll(){
    
        // select all query
        $query = "SELECT id, manufacturer, model, year
                FROM
                    " . $this->table_name . "
                ORDER BY
                    id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    //read one car
    function readById(){

        // select query
        $query = "SELECT id, manufacturer, model, year
                FROM
                    " . $this->table_name . "
                WHERE id = ?
                LIMIT 0, 1";
        
        // prepare the query
        $stmt = $this->conn->prepare( $query );

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind given id value
        $stmt->bindParam(1, $this->id);
    
        // execute the query
        $stmt->execute();
    
        // get number of rows
        $num = $stmt->rowCount();
    
        // if id exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
    
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // assign values to object properties
            $this->id = $row['id'];
            $this->manufacturer = $row['manufacturer'];
            $this->model = $row['model'];
            $this->year = $row['year'];
    
            // return true because id exists in the database
            return true;
        }
    
        // return false if id does not exist in the database
        return false;
    }

    //add new car
    function insert(){

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    manufacturer = :manufacturer,
                    model = :model,
                    year = :year";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->manufacturer=htmlspecialchars(strip_tags($this->manufacturer));
        $this->model=htmlspecialchars(strip_tags($this->model));
        $this->year=htmlspecialchars(strip_tags($this->year));
    
        // bind the values
        $stmt->bindParam(':manufacturer', $this->manufacturer);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':year', $this->year);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    //update existing car
    function update(){
    
        //update query
        $query = "UPDATE " . $this->table_name . "
                SET
                    manufacturer = :manufacturer,
                    model = :model,
                    year = :year
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->manufacturer=htmlspecialchars(strip_tags($this->manufacturer));
        $this->model=htmlspecialchars(strip_tags($this->model));
        $this->year=htmlspecialchars(strip_tags($this->year));
    
        // bind the values from the form
        $stmt->bindParam(':manufacturer', $this->manufacturer);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':year', $this->year);
    
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    //delete car
    function delete(){

        //delete query
        $query = "DELETE FROM " . $this->table_name . "
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind the values from the form
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
?>