# mayumi
### description
Hello.
english language processing. Trying on some Chomsky universal grammar.

### details
- Mai is a node based english language processor that runs on commandline. 
- In addition, Mai includes a restful, lamp server to bypass the xss limitations when using some web apis or page scraping.
- Secondary objective is to build up my php library tools
- Intends to be a multiple agent bot that labels part of speechs and learns sentence structures. Agents include
	- google
	- wikipedia 
	- merriam webster dictionary
	- parse (storing results)
	- mysql 
	- our grammar parser 

### run me
Server is setup. currently at "theninthbit.us/mayumi/server"
- Add npm packages needed with `sudo npm install` from the root directory cli.
- Run the client with `node main.js`

If setting up your own server, 
- `mayumi/server` directory needs to be accessible to a server.
- Server path needs to be added to node config. In `mayumi/client/services/serverUtilities.js:line 5`, set your path like `serverUrl = 'http://localhost/mayumi/server/';`
<<<<<<< HEAD
- Database config file needs to be created and added to. `mayumi/config/dbServerConfig.php` creates a mysqli object and passes it to the db.
=======
- Add npm packages needed with `sudo npm install` from the root directory cli.
- Run with `node main.js`
>>>>>>> e5aeabd908d3831adac6572a182b41af3a8d663c
