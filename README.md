# mayumi
### Description
english language processing. Trying on some Chomsky universal grammar.

### Some Details
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

### Run me
Its overly complicated at the moment. Once its on the server and more packages like config are in, it'll get simpler.
- `mayumi/server` directory needs to be accessible to a server.
- Server path needs to be added to node config. In `mayumi/client/services/serverUtilities.js`:line 5, set your path like `serverUrl = 'http://localhost/mayumi/server/';`
- Add npm packages needed with `sudo npm install` from the root directory cli.
- Run with `node main.js`