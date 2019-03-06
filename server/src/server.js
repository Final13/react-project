const express = require('express');

const app = express();
const config = require('./config');
const routes = require('./routes');

config.express(app);
config.mongo();

routes.mail(app);
routes.user(app);


app.listen(config.app.appPort, () => { console.log(`Listening on port ${config.app.appPort}...`); });