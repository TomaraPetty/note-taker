
// Linking routes to data sources.

var notesData = require("../db/db.json");
const shortid = require('shortid');
const fs = require("fs");


module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/notes", function(req, res) {
    console.log(req.body);
    const newNote = {
      id: shortid.generate(),
      title: req.body.title,
      text: req.body.text,
    }
    console.log(newNote);
    notesData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesData), function(err){
      if(err) throw err;
      res.json(notesData);
    });  
  });
  // Delete note
  app.delete("/api/notes/:id", function(req, res) {
    // Empty out notes array of data
    console.log(req.params.id);
    console.log(notesData);
    let temp = []

    for(let i = 0; i < notesData.length; i++) {
      if(notesData[i].id !== req.params.id) {
        temp.push(notesData[i]) 
        console.log(temp);
      }
    }
    fs.writeFile("./db/db.json", JSON.stringify(temp), function(err){
      if(err) throw err;
      res.json({ ok: true });
    }); 
  });
};
