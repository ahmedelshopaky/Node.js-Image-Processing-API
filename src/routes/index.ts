import express from 'express';
import image from './api/image';

const routes = express.Router();

routes.use('/api/image', image);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.json({ response: 'Hello there!' });
});

export default routes;
