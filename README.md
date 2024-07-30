# Webhooks

> Example Express Server to Process Shopify Webhooks

## Example Discount Creating Payload

```json
{
  "admin_graphql_api_id": "gid://shopify/DiscountCodeNode/1166641397843",
  "title": "DISCOUNT_TEST",
  "status": "ACTIVE",
  "created_at": "2024-07-30T12:34:37-07:00",
  "updated_at": "2024-07-30T12:34:37-07:00"
}
```

## Run

```bash
npm run start
```

## Dev

Use ngrok to expose

```bash
ngrok http 3001
```
