import * as express from "express";

const PORT = 8080;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// determine the extension (if it's m3u8, mpd, mp4, ts)

