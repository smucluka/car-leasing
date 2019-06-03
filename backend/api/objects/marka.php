<?php
// 'marka' object
class Marka{

    // database connection and table name
    private $conn;
    private $table_name = "marka";

    // object properties
    public $id;
    public $name;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // read all
    function readAll(){
    
        // select all query
        $query = "SELECT id, name
                FROM " . $this->table_name . "
                ";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    // read all
    function readAvailable(){
    
        // select all query
        $query = "SELECT m.id AS id, m.name AS name
                FROM " . $this->table_name . " AS m
                JOIN automobil AS c ON m.id = c.marka_id 
                ORDER BY name";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    //read one
    function readById(){

        // select query
        $query = "SELECT id, name
                FROM " . $this->table_name . "
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
            $this->name = $row['name'];
    
            // return true because id exists in the database
            return true;
        }
    
        // return false if id does not exist in the database
        return false;
    }

    //add new
    function insert(){

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    name = :name";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
    
        // bind the values
        $stmt->bindParam(':name', $this->name);
    
        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    //update existing
    function update(){
    
        //update query
        $query = "UPDATE " . $this->table_name . "
                SET
                    name = :name
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
    
        // bind the values from the form
        $stmt->bindParam(':name', $this->name);
    
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    //delete
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