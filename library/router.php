<?php
	//restful php service
	
	class Router{
		//check for logger and error handler.
		//TODO


		//	initializes our routes list and response object variables	
		public $routes;
		public $response;

		
		/*
			Initializes our list of routes to look for.
			Builds the response object.
		*/
		public function __construct(){
			$this->routes = array();
			$this->response = json_decode('{"data":{}, "error":{}, "status":"success"}');
		}


		/*
			Reads the uri and picks our route from the list. 
			Calls the associated callback passing in the response object as a param. 
		*/
		public function route(){
			$uri = $this->getUri();
			if(array_key_exists($uri, $this->routes)){
				$this->routes[$uri]($this->response);
			}else{
				$this->response->status="error";
				$this->response->error->class="router";
				$this->response->error->message="route '$uri' doesnt exist. sorry.";
			}

			//echo(json_encode($this->response));
		}

		/* ********************************* HELPER FUNCTIONS ********************************* */

		/*
	    Reads SERVER var requestUri and requestMethod and returns a route string
	    returns string [method:path]
	  */
	  function getUri(){
	    $uri=explode("/",$_SERVER['REQUEST_URI']);

	    //get rid of extra directory depth
	    array_shift($uri);
	    array_shift($uri);
	    array_shift($uri);
	    $uri=join("/",$uri);

	    //get rid of param string
	    $uri=explode("?",$uri);
	    $params=$uri[1];
	    $uri=$uri[0];
	    
	    //get GET params
	    $params=explode("&",$params);
	    foreach($params as $param){
	      $param=split("=",$param);
	      $_GET[$param[0]]=$param[1];
	    }
	    $method=$_SERVER['REQUEST_METHOD'];
	    return "$method:$uri";
	  }


		function get($pathname, $function){
			$this->routes["GET:$pathname"] = $function;
		}


		function post($pathname, $function){
			$this->routes["POST:$pathname"] = $function;
		}


		function put($pathname, $function){
			$this->routes["PUT:$pathname"] = $function;
		}


		function delete($pathname, $function){
			$this->routes["DELETE:$pathname"] = $function;
		}
	}




	return new Router;
?>