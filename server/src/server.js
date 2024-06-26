const databaseSeed = require('./seeds');
const express = require('express');

const app = express();
const config = require('./config');
const routes = require('./routes');

config.express(app);
config.mongo();

routes.mail(app);
routes.user(app);
routes.work(app);
routes.contract(app);
routes.builder(app);
routes.product(app);
routes.settings(app);

databaseSeed();

app.listen(config.app.appPort, () => { console.log(`Listening on port ${config.app.appPort}...`); });