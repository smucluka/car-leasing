<?php
// 'car' object
class Car{

    // database connection and table name
    private $conn;
    private $table_name = "automobil";

    // object properties
    public $id;
    public $marka_id;
    public $marka;
    public $model;
    public $godina_proizvodnje;
    public $godina_modela;
    public $kilometraza;
    public $motor;
    public $snaga_motora;
    public $radni_obujam;
    public $mjenjac;
    public $broj_stupnjeva;
    public $potrosnja_goriva;
    public $stanje_vozila;
    public $lokacija_vozila;
    public $vlasnik;
    public $garaziran;
    public $broj_vrata;
    public $broj_sjedala;
    public $boja;
    public $vrsta_pogona;
    public $dodatna_oprema;
 
    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // read all cars
    function readAll(){
    
        // select all query
        $query = "SELECT v.id AS id, marka_id, m.name AS marka, model, godina_proizvodnje, godina_modela, kilometraza, motor, snaga_motora, radni_obujam, mjenjac, broj_stupnjeva, potrosnja_goriva, stanje_vozila, lokacija_vozila, vlasnik, garaziran, broj_vrata, broj_sjedala, boja, vrsta_pogona
                FROM " . $this->table_name . " AS v
                JOIN marka AS m
                WHERE v.marka_id = m.id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // execute query
        $stmt->execute();
    
        return $stmt;
    }

    //read one car
    function readById(){

        // select query
        $query = "SELECT v.id AS id , marka_id, m.name AS marka, model, godina_proizvodnje, godina_modela, kilometraza, motor, snaga_motora, radni_obujam, mjenjac, broj_stupnjeva, potrosnja_goriva, stanje_vozila, lokacija_vozila, vlasnik, garaziran, broj_vrata, broj_sjedala, boja, vrsta_pogona, GROUP_CONCAT(CONCAT(ado.id_dodatna_oprema,':',dod.name) SEPARATOR ',')  AS dodatna_oprema
                FROM " . $this->table_name . " AS v
                JOIN marka AS m ON v.marka_id = m.id
                JOIN automobil_dodatna_oprema AS ado ON v.id = ado.id_automobil
                JOIN dodatna_oprema AS dod ON ado.id_dodatna_oprema = dod.id
                WHERE v.id = ?
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
            $this->marka_id = $row['marka_id'];
            $this->marka = $row['marka'];
            $this->model = $row['model'];
            $this->godina_proizvodnje = $row['godina_proizvodnje'];
            $this->godina_modela = $row['godina_modela'];
            $this->kilometraza = $row['kilometraza'];
            $this->motor = $row['motor'];
            $this->snaga_motora = $row['snaga_motora'];
            $this->radni_obujam = $row['radni_obujam'];
            $this->mjenjac = $row['mjenjac'];
            $this->broj_stupnjeva = $row['broj_stupnjeva'];
            $this->potrosnja_goriva = $row['potrosnja_goriva'];
            $this->stanje_vozila = $row['stanje_vozila'];
            $this->lokacija_vozila = $row['lokacija_vozila'];
            $this->vlasnik = $row['vlasnik'];
            $this->garaziran = $row['garaziran'];
            $this->broj_vrata = $row['broj_vrata'];
            $this->broj_sjedala = $row['broj_sjedala'];
            $this->boja = $row['boja'];
            $this->vrsta_pogona = $row['vrsta_pogona'];
            $this->dodatna_oprema = $row['dodatna_oprema'];
    
            // return true because id exists in the database
            return true;
        }
    
        // return false if id does not exist in the database
        return false;
    }

    //add new car
    function insert($filenamesToSave){

        try {

        $this->conn->beginTransaction();

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    marka_id = :marka_id,
                    model = :model,
                    godina_proizvodnje = :godina_proizvodnje,
                    godina_modela = :godina_modela,
                    kilometraza = :kilometraza,
                    motor = :motor,
                    snaga_motora = :snaga_motora,
                    radni_obujam = :radni_obujam,
                    mjenjac = :mjenjac,
                    broj_stupnjeva = :broj_stupnjeva,
                    potrosnja_goriva = :potrosnja_goriva,
                    stanje_vozila = :stanje_vozila,
                    lokacija_vozila = :lokacija_vozila,
                    vlasnik = :vlasnik,
                    garaziran = :garaziran,
                    broj_vrata = :broj_vrata,
                    broj_sjedala = :broj_sjedala,
                    boja = :boja,
                    vrsta_pogona = :vrsta_pogona";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->marka_id=htmlspecialchars(strip_tags($this->marka_id));
        $this->model=htmlspecialchars(strip_tags($this->model));
        $this->godina_proizvodnje=htmlspecialchars(strip_tags($this->godina_proizvodnje));
        $this->godina_modela=htmlspecialchars(strip_tags($this->godina_modela));
        $this->kilometraza=htmlspecialchars(strip_tags($this->kilometraza));
        $this->motor=htmlspecialchars(strip_tags($this->motor));
        $this->snaga_motora=htmlspecialchars(strip_tags($this->snaga_motora));
        $this->radni_obujam=htmlspecialchars(strip_tags($this->radni_obujam));
        $this->mjenjac=htmlspecialchars(strip_tags($this->mjenjac));
        $this->broj_stupnjeva=htmlspecialchars(strip_tags($this->broj_stupnjeva));
        $this->potrosnja_goriva=htmlspecialchars(strip_tags($this->potrosnja_goriva));
        $this->stanje_vozila=htmlspecialchars(strip_tags($this->stanje_vozila));
        $this->lokacija_vozila=htmlspecialchars(strip_tags($this->lokacija_vozila));
        $this->vlasnik=htmlspecialchars(strip_tags($this->vlasnik));
        $this->garaziran=htmlspecialchars(strip_tags($this->garaziran));
        $this->broj_vrata=htmlspecialchars(strip_tags($this->broj_vrata));
        $this->broj_sjedala=htmlspecialchars(strip_tags($this->broj_sjedala));
        $this->boja=htmlspecialchars(strip_tags($this->boja));
        $this->vrsta_pogona=htmlspecialchars(strip_tags($this->vrsta_pogona));
    
        // bind the values
        $stmt->bindParam(':marka_id', $this->marka_id);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':godina_proizvodnje', $this->godina_proizvodnje);
        $stmt->bindParam(':godina_modela', $this->godina_modela);
        $stmt->bindParam(':kilometraza', $this->kilometraza);
        $stmt->bindParam(':motor', $this->motor);
        $stmt->bindParam(':snaga_motora', $this->snaga_motora);
        $stmt->bindParam(':radni_obujam', $this->radni_obujam);
        $stmt->bindParam(':mjenjac', $this->mjenjac);
        $stmt->bindParam(':broj_stupnjeva', $this->broj_stupnjeva);
        $stmt->bindParam(':potrosnja_goriva', $this->potrosnja_goriva);
        $stmt->bindParam(':stanje_vozila', $this->stanje_vozila);
        $stmt->bindParam(':lokacija_vozila', $this->lokacija_vozila);
        $stmt->bindParam(':vlasnik', $this->vlasnik);
        $stmt->bindParam(':garaziran', $this->garaziran);
        $stmt->bindParam(':broj_vrata', $this->broj_vrata);
        $stmt->bindParam(':broj_sjedala', $this->broj_sjedala);
        $stmt->bindParam(':boja', $this->boja);
        $stmt->bindParam(':vrsta_pogona', $this->vrsta_pogona);
    
         if(!$stmt->execute()){
            $this->conn->rollBack();
            return false;
        }

        $last_id = $this->conn->lastInsertId();
        $this->id = $last_id;

        $query2 = "INSERT INTO automobil_dodatna_oprema
                SET 
                    id_automobil = :id_automobil,
                    id_dodatna_oprema = :id_dodatna_oprema";

        $stmt2 = $this->conn->prepare($query2);
        $stmt2->bindParam(':id_automobil', $last_id);

        $dodOp = explode(",", $this->dodatna_oprema);
        foreach($dodOp as $do) {
            $stmt2->bindParam(':id_dodatna_oprema', $do);
            $stmt2->execute();
        }

        $query3 = "INSERT INTO slika_automobil
                SET 
                    filename = :filename,
                    id_automobil = :id_automobil";

        $stmt3 = $this->conn->prepare($query3);
        $stmt3->bindParam(':id_automobil', $last_id);

        foreach($filenamesToSave as $fn) {
            $stmt3->bindParam(':filename', $fn);
            $stmt3->execute();
        }
        
        $this->conn->commit();
        return true;
        
        } catch(Exception $e) {
            $this->conn->rollback();
            return false;
        }
    }

    //update existing car
    function update(){
    
        //update query
        $query = "UPDATE " . $this->table_name . "
                SET
                    marka_id = :marka_id,
                    model = :model,
                    godina_proizvodnje = :godina_proizvodnje,
                    godina_modela = :godina_modela,
                    kilometraza = :kilometraza,
                    motor = :motor,
                    snaga_motora = :snaga_motora,
                    radni_obujam = :radni_obujam,
                    mjenjac = :mjenjac,
                    broj_stupnjeva = :broj_stupnjeva,
                    potrosnja_goriva = :potrosnja_goriva,
                    stanje_vozila = :stanje_vozila,
                    lokacija_vozila = :lokacija_vozila,
                    vlasnik = :vlasnik,
                    garaziran = :garaziran,
                    broj_vrata = :broj_vrata,
                    broj_sjedala = :broj_sjedala,
                    boja = :boja,
                    vrsta_pogona = :vrsta_pogona
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->marka_id=htmlspecialchars(strip_tags($this->marka_id));
        $this->model=htmlspecialchars(strip_tags($this->model));
        $this->godina_proizvodnje=htmlspecialchars(strip_tags($this->godina_proizvodnje));
        $this->godina_modela=htmlspecialchars(strip_tags($this->godina_modela));
        $this->kilometraza=htmlspecialchars(strip_tags($this->kilometraza));
        $this->motor=htmlspecialchars(strip_tags($this->motor));
        $this->snaga_motora=htmlspecialchars(strip_tags($this->snaga_motora));
        $this->radni_obujam=htmlspecialchars(strip_tags($this->radni_obujam));
        $this->mjenjac=htmlspecialchars(strip_tags($this->mjenjac));
        $this->broj_stupnjeva=htmlspecialchars(strip_tags($this->broj_stupnjeva));
        $this->potrosnja_goriva=htmlspecialchars(strip_tags($this->potrosnja_goriva));
        $this->stanje_vozila=htmlspecialchars(strip_tags($this->stanje_vozila));
        $this->lokacija_vozila=htmlspecialchars(strip_tags($this->lokacija_vozila));
        $this->vlasnik=htmlspecialchars(strip_tags($this->vlasnik));
        $this->garaziran=htmlspecialchars(strip_tags($this->garaziran));
        $this->broj_vrata=htmlspecialchars(strip_tags($this->broj_vrata));
        $this->broj_sjedala=htmlspecialchars(strip_tags($this->broj_sjedala));
        $this->boja=htmlspecialchars(strip_tags($this->boja));
        $this->vrsta_pogona=htmlspecialchars(strip_tags($this->vrsta_pogona));
    
        // bind the values from the form
        $stmt->bindParam(':marka_id', $this->marka_id);
        $stmt->bindParam(':model', $this->model);
        $stmt->bindParam(':godina_proizvodnje', $this->godina_proizvodnje);
        $stmt->bindParam(':godina_modela', $this->godina_modela);
        $stmt->bindParam(':kilometraza', $this->kilometraza);
        $stmt->bindParam(':motor', $this->motor);
        $stmt->bindParam(':snaga_motora', $this->snaga_motora);
        $stmt->bindParam(':radni_obujam', $this->radni_obujam);
        $stmt->bindParam(':mjenjac', $this->mjenjac);
        $stmt->bindParam(':broj_stupnjeva', $this->broj_stupnjeva);
        $stmt->bindParam(':potrosnja_goriva', $this->potrosnja_goriva);
        $stmt->bindParam(':stanje_vozila', $this->stanje_vozila);
        $stmt->bindParam(':lokacija_vozila', $this->lokacija_vozila);
        $stmt->bindParam(':vlasnik', $this->vlasnik);
        $stmt->bindParam(':garaziran', $this->garaziran);
        $stmt->bindParam(':broj_vrata', $this->broj_vrata);
        $stmt->bindParam(':broj_sjedala', $this->broj_sjedala);
        $stmt->bindParam(':boja', $this->boja);
        $stmt->bindParam(':vrsta_pogona', $this->vrsta_pogona);
    
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

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $img_arr=array();

        // get images
        $query0 = "SELECT filename FROM slika_automobil WHERE id_automobil = :id";
        $stmt0 = $this->conn->prepare($query0);
        $stmt0->bindParam(':id', $this->id);
        $stmt0->execute();
        $num = $stmt0->rowCount();
        if($num>0){            
            while ($row = $stmt0->fetch(PDO::FETCH_ASSOC)){
                extract($row);
                array_push($img_arr, $filename);
            }
        }

        //delete query
        $query = "DELETE FROM " . $this->table_name . "
                WHERE id = :id";
    
        // prepare the query
        $stmt = $this->conn->prepare($query);
    
        
    
        // bind the values from the form
        $stmt->bindParam(':id', $this->id);
    
        // execute the query
        if($stmt->execute()){

            return $img_arr;
        }
    
        return array();
    }
}
?>