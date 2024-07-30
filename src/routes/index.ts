import type { Express, Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { updateDiscount } from '../controllers/index.js';

function verifyWebhook(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  console.log('req.rawBody', req?.rawBody);
  const key = process.env.WEBHOOK_SECRET as string;
  const hmac = req.get('X-Shopify-Hmac-Sha256');
  const hash = crypto
    .createHmac('sha256', key)
    .update(req.rawBody, 'utf8') // removed hex
    .digest('base64');
  if (hmac === hash) {
    console.log('+++++++++++++++++ REQUEST VERIFIED +++++++++++++++++>');
    next();
  } else {
    console.log('+++++++++++++++++ ERROR - FORBIDDEN +++++++++++++++++>');
    res.sendStatus(403);
  }
}

const routes = (app: Express) => {
  app.post('/discounts', verifyWebhook, updateDiscount);
};

export default routes;
