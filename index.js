const httpServer = require('http');
const url = require('url');

const server = httpServer.createServer(function(req,res) {

    const urlParameter = url.parse(req.url,true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);
    
    if(urlParameter.query.id){
        if(urlParameter.pathname === '/' || urlParameter.pathname.toLowerCase() === '/courses'){
            res.writeHead(200,{
                'Content-type': 'text/html'
            });
            res.end(`We received out first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}`)
        }
    }else{

        res.writeHead(404,{
            'Content-type': 'text/html'
        });
    
        res.end(`resource not found`);
    

    }

    
});

server.listen(8000, `localhost`, function(){
    console.log(`Listening to requests on port 8000`);
});