import express, { Response, Request } from 'express';
import cors from 'cors';
import routes from './routes/index.js';

const PORT = process.env.PORT || 3000;

const app = express();

// Calling the express.json() method for parsing
app.use(
  express.json({
    limit: '50mb',
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(cors());

function format(uptime: number) {
  function pad(s: number) {
    return (s < 10 ? '0' : '') + s;
  }
  const hours = Math.floor(uptime / (60 * 60));
  const minutes = Math.floor((uptime % (60 * 60)) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

app.get('/', (req: Request, res: Response) =>
  // res.status(200).send('Hello, friend...')
  res.status(200).send({
    uptime: format(process.uptime()),
    message: 'Ok',
    date: new Date(),
    ip: req.ip,
  })
);

routes(app);

app.listen(PORT, () =>
  console.log('🚀 Server ready at: http://localhost:3001')
);
