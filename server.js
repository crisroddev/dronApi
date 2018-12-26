const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

state = {"drones": []};

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/drones', function (req, res) {
    res.status(200).send(state.drones);
});

app.post('/drones', (req, res) => {
    id = {id: uuid()};
    state.drones.push(Object.assign({}, req.body, id));
    res.status(200).send(id);
});

app.delete('/drones/:id', (req, res) => {
    var id = req.params.id;
    var index = state.drones.findIndex((drone) => drone.id == id)
    if (index === -1) {
        res.status(400).send();
    } else {
        state.drones.splice(index, 1);
        res.status(200).send();
    }
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server
