const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');

//Read data from file

const tempCourse = fs.readFileSync(
    `${__dirname}/data.json`,
    'utf-8'
);

//Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/templateCourse-1.html`,
    'utf-8'
);

/*const replaceTemplate = (htmlStr, course) => { //fat arrow or lambda
    let output = htmlStr.replace(/{%NAME%}/g, course.courseName);
    output = output.replace(/{%IMAGE%}/g,course.image);
    output = output.replace(/{%FROM%}/g,course.from);
    output = output.replace(/{%INSTRUCTOR%}/g,course.instructor);
    output = output.replace(/{%CREDITS%}/g,course.credits);
    output = output.replace(/{%DESCRIPTION%}/g,course.description);
    output = output.replace(/{%ID%}/g,course.id);
    return output;

}*/
const dataObj = JSON.parse(tempCourse); 


//create server
const server = httpServer.createServer((req,res) => {

    //const urlParameter = url.parse(req.url, true);
    //console.log(JSON.stringify(urlParameter.query));//convert to string
    //console.log(JSON.stringify(urlParameter.pathname)); // convert to String
    //console.log(urlParameter.pathname);
    const {query,pathname} = url.parse(req.url,true); //object destructor
    if(query.id){ //if there is query parameter named id
        if(pathname === '/' || pathname.toLowerCase() === '/courses'){
            res.writeHead(200, {//Everything ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(urlParameter.query.id)];
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course);
            //res.end(`We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id} 
            //${JSON.stringify(course)}
            //`)
            res.end(courseHTML); 
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