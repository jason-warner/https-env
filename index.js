import https from 'https';
import fs from 'fs';


const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello World\n");
}).listen(8000)