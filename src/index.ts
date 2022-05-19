import express from 'express';
import routes from './routes/index';

const app = express();
const PORT = (process.env.PORT as unknown as number) || 8080;

app.listen(PORT, () => {
  console.log('[SERVER] Listening...');
});

// Routes (End Points)
app.use(routes);

// Not Found MW
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ response: '404 NOT FOUND' });
});

// app.use((err, req: express.Request, res: express.Response, next: Function) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

export default app;
