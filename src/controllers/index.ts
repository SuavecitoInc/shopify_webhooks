import type { Request, Response } from 'express';
import {
  shopifyAuthenticatedFetch,
  updateAutomaticAppDiscount,
  updateAutomaticBasicDiscount,
  updateAutomaticBxgyDiscount,
  updateAutomaticFreeShippingDiscount,
  updateDiscountCodeBasic,
  updateDiscountCodeBxgy,
} from '../lib/utils/index.js';
import { discountNode } from '../lib/handlers/queries/index.js';
import type { DiscountNodeQuery } from '../lib/types/admin.generated.js';

type WebhookDiscountBody = {
  admin_graphql_api_id: string;
  title: string;
  status: 'ACTIVE' | 'EXPIRED' | 'SCHEDULED' | 'DISABLED';
  created_at: string;
  updated_at: string;
};

const getDiscount = async (id: string) => {
  const response = await shopifyAuthenticatedFetch<DiscountNodeQuery>(
    discountNode,
    { id }
  );

  console.log('DISCOUNT NODE RESPONSE', JSON.stringify(response, null, 2));

  if (response?.data?.discountNode) {
    return response.data.discountNode;
  }
  return null;
};

export const updateDiscount = async (req: Request, res: Response) => {
  console.log('BODY', JSON.stringify(req.body, null, 2));

  const { admin_graphql_api_id }: WebhookDiscountBody = req.body;

  console.log('Getting discount', admin_graphql_api_id);

  // get discount node
  const response = await getDiscount(admin_graphql_api_id);

  if (!response) {
    console.log('Discount not found, therefore not updating');
    res.status(404).json({ error: 'Discount not found' });
    return;
  }

  const { discount } = response;

  console.log('Discount found', JSON.stringify(discount, null, 2));

  const { type } = discount;

  if (type === 'DiscountAutomaticApp') {
    // discount automatic app
    await updateAutomaticAppDiscount(admin_graphql_api_id);
  } else if (type === 'DiscountAutomaticBasic') {
    // discount automatic basic
    await updateAutomaticBasicDiscount(admin_graphql_api_id);
  } else if (type === 'DiscountAutomaticBxgy') {
    // discount automatic bxgy
    await updateAutomaticBxgyDiscount(admin_graphql_api_id);
  } else if (type === 'DiscountAutomaticFreeShipping') {
    // discount automatic free shipping
    await updateAutomaticFreeShippingDiscount(admin_graphql_api_id);
  } else if (type === 'DiscountCodeBasic') {
    // discount code basic
    await updateDiscountCodeBasic(admin_graphql_api_id);
  } else if (type === 'DiscountCodeBxgy') {
    // discount code bxgy
    await updateDiscountCodeBxgy(admin_graphql_api_id);
  } else {
    console.log('No matching discount type');
    res.status(404).json({ error: 'No matching discount type' });
  }

  const discountUpdated = {
    message: 'Discount updated',
    type,
    id: admin_graphql_api_id,
  };
  console.log('Discount updated', JSON.stringify(discountUpdated, null, 2));
  res.status(200).json(discountUpdated);
};
