import https from "https";
import express from "express";
import xml2js from "xml2js";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express(),
  parseString = xml2js.parseString,
  __dirname = dirname(fileURLToPath(import.meta.url)),
  hostname = "localhost",
  dirToServ = "client",
  port = 443;

app.use(express.json());
app.use(
  "/",
  express.static(path.join(path.resolve(__dirname), "../", dirToServ))
);

const httpsOpts = {
    cert: fs.readFileSync(
      path.join(path.resolve(__dirname), "/ssl/xylemtree_dev.crt")
    ),
    ca: fs.readFileSync(
      path.join(path.resolve(__dirname), "/ssl/xylemtree_dev.ca-bundle")
    ),
    key: fs.readFileSync(
      path.join(path.resolve(__dirname), "/ssl/xylemtree_dev.key")
    ),
  },
  httpsServer = https.createServer(httpsOpts, app);

app.get("/", (req, res) => {
  res.send("getting getting");
  console.log(req.body);
});

// app.post("/test", async (req, res) => {
//   res.send("testing testing");
//   req &&
//     parseString(await req.body)
//       .then(function (result) {
//         console.dir(result);
//         console.log("Done");
//       })
//       .catch(function (err) {
//         // Failed
//       });
// });
app.post("/test", (req, res) => {
  req.on('data', chunk => {
    parseString(chunk, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        console.log("Done");
      }
    });
    console.log(`Data chunk available: ${chunk}`)
  })
  req.on('end', () => {
    //end of data
  })
  
  res.send("testing testing");
});

app.post("/", (req, res) => {
  res.send("posting posting");
  console.log(req.body);
});

httpsServer.listen(port, hostname, () =>
  console.log(`Magick in directory ${dirToServ} at https://localhost:${port}`)
);

//() => console.log(`Magick in directory ${dirToServ} at https://localhost:${port}`)

// const options = {
//   cert: fs.readFileSync(path.join(path.resolve(__dirname), 'cert.pem')),
//   key: fs.readFileSync(path.join(path.resolve(__dirname), 'xylemtree_dev.key'))
// };

// https
//   .createServer(options, app)
//   .listen(port, () => {
//     console.log(`Magick in directory ${dirToServ} at https://localhost:${port}`)
//   })

// https.createServer(options, (req, res) => {
//   console.log('fired')
//   res.writeHead(200);
//   res.end("Hello World\n");
// }).listen(443);
