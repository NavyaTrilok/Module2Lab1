const httpServer = require('http');
const url = require('url');
const fs = require('fs');

//Read data from file

const tempCourse = fs.readFileSync(
    `${__dirname}/data.json`,
    'utf-8'
);

const dataObj = JSON.parse(tempCourse); 


//create server
const server = httpServer.createServer(function(req,res) {

    const urlParameter = url.parse(req.url, true);
    console.log(urlParameter.query);
    console.log(urlParameter.pathname);

    if(urlParameter.query.id){ //if there is query parameter named id
        if(urlParameter.pathname === '/' || urlParameter.pathname.toLowerCase() === '/courses'){
            res.writeHead(200, {//Everything ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(urlParameter.query.id)];
            res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id} 
            ${JSON.stringify(course)}
            `) 
        }
        else{
            res.writeHead(404, { //server did not find what you were looking for
                'content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    }
});

server.listen(8000, `localhost`, function(){
    console.log(`Listening to requests on port 8000`);
});