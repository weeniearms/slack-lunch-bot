import express from 'express';
import routes from './routes';
import config from './config';
import {urlencoded, json} from 'body-parser';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

routes(app);

const server = app.listen(config.port || 3000, () => {
  const {address, port} = server.address();

  console.log(`slack-lunch-bot listening at http://${address}:${port}`);
});
