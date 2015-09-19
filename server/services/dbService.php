<?php

	class dbUtil{

		public function __construct($dbConnection){
			//save the connection internally
			$this->db = $dbConnection;

			//check if the connectino was valid
			if($this->db->connect_errno){
				echo $this->db->connect_errno;
				printf("Connection failed(%i): %s\n", $this->db->connect_errno, $this->db->connect_error);
				exit();
			}
		}


		public function query ($sql, $params){
			if($stmt = $this->db->prepare($sql)){
				if(count($params) >0){
					foreach(params as $param){
						$stmt->bind_param($param->type, $param->value);
					}
				}

				$stmt->execute();
				$resultSet = array();
				$result = $stmt->get_result();

				if(is_bool($result)) return $result;

		    while ($row = $result->fetch_assoc()) {
		    	array_push($resultSet, $row);
				}
			}

			return json_encode($resultSet);
		}

		public function close(){
			$this->db->close();
		}

	}

	return new dbUtil(require('../config/dbServerConfig.php'));
?>