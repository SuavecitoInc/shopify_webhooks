const query = `#graphql
query discountNode($id: ID!) {
  discountNode(id: $id) {
    id
    discount {
      ... on DiscountCodeBasic {
        title
        type: __typename
      }
      ... on DiscountCodeBxgy {
        title
        type: __typename
      }
      ... on DiscountCodeFreeShipping {
        title
        type: __typename
      }
      ... on DiscountAutomaticApp {
        title
        type: __typename
      }
      ... on DiscountAutomaticBasic {
        title
        type: __typename
      }
      ... on DiscountAutomaticBxgy {
        title
        type: __typename
      }
      ... on DiscountAutomaticFreeShipping {
        title
        type: __typename
      }
    }
  }
}
`;

export default query;
