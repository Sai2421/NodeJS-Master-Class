/*
 primary file

*/

//Dependencies
var http = require('http');
var url = require('url');
var server = http.createServer(function(req,res){
 
 // parsing url   
 var parsedUrl = url.parse(req.url,true);
 
 //getting the pathname
 var path = parsedUrl.pathname;
 var trimmedPath = path.replace(/^\/+|\/+$/g, '');   

 // ternary operator to check chosenHandler is exists or not, if not, defualt to not Found handler 
 var calledHandler = typeof(routers[trimmedPath])!=='undefined' ? routers[trimmedPath] : handlers.notFound;
 
 var data = {
 'trimmedPath' : trimmedPath
 };

 // the handler function
 calledHandler(function(statuscode,_query){
 
    statuscode = typeof(statuscode)=='number' ? statuscode : 200;
    _query = typeof(_query)== 'object' ? _query : {};
  
    // converting the object to JSON format
  var buffer = JSON.stringify(_query);
 
  res.setHeader('Content-Type','application/json');
  res.writeHead(statuscode);
  res.end(buffer);
 });
});

// start the server
server.listen(3000,function(){
console.log("server running at port 3000");
});

// declaring the handler object
var handlers ={};

//declaring the handler functions 
handlers.hello = function(callback){
callback(406,{'welcome':'my first api'});
};
handlers.notFound = function(callback){
    callback(404,{'wrong':'one dude'});
} ;

// declaring the routers
var routers = {
'hello':handlers.hello,
'notFound':handlers.notFound
};