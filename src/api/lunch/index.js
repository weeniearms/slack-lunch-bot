import express from 'express';
import config from '../../config';
import store from './store';

const router = express.Router();

function ok(response, handler, inChannel, param) {
  response.json(200, {
    response_type: inChannel ? "in_channel" : "ephemeral",
    text: handler(param),
  });
}

router.post('/', (req, res) => {
  if (config.tokens.indexOf(req.body.token) < 0) {
    res.sendStatus(403);
  } else {
    let command = req.body.text.split(' ')[0];
    switch (command) {
      case 'add':
        ok(res, store(req.body.team_id).add, false, req.body.text.substring(req.body.text.indexOf(' ') + 1));
        break;
      case 'remove':
        ok(res, store(req.body.team_id).remove, false, req.body.text.substring(req.body.text.indexOf(' ') + 1));
        break;
      case 'clear':
        ok(res, store(req.body.team_id).clear);
        break;
      case 'list':
        ok(res, store(req.body.team_id).list, true);
        break;
      default:
        ok(res, 'Unknown command');
    }
  }
});

export default router;
