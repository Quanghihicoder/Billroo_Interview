import express, { Application, Request, Response } from "express";

// import routes
import router from "./routes/routes";

// import cors - provides Express middleware to enable CORS with various options, connect frontend
import cors from "cors";

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//use cors
app.use(cors());

// use router
app.use(router);

app.get('/apis', (req: Request, res: Response) => {
    res.set('Content-Type', 'text/html');
    res.status(200).send("<p>Welcome to Billroo APIs</p>");
});

app.use(function (req: Request, res: Response) {
    res.status(404);

    if (req.accepts('html')) {
        res.set('Content-Type', 'text/html');
        res.status(404).send(`
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>Billroo</title>
                <meta name="description" content="404">
            </head>
            <body>
                <p>Not Found! Please check your api url.</p>
            </body>
            </html>
        `);
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ status: 0, message: "API not found!", data: [] });
        return;
    }
});

const port: number = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
    console.log(`Open localhost:${port}/apis`);
});