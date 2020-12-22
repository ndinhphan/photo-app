"use strict";

const gcloud = require("gcloud");

const PROJECT_ID = "<project-id>";

let storage = gcloud.storage({
  projectId: PROJECT_ID,
  keyFilename: 'auth.json'
});

let bucket = storage.bucket(`${PROJECT_ID}.appspot.com`)
bucket.upload("yuuna.jpg", (err, file) => {
    if (err) { return console.error(err); }
    let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${PROJECT_ID}.appspot.com/o/${file.metadata.name}?alt=media`;
    console.log(publicUrl);
});

