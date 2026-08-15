import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:3000/api/graphql');

async function test() {
  const SEARCH_QUERY = gql`
    query SearchProducts($search: String!, $limit: Int!) {
      products(
        where: {
          OR: [
            { title: { contains: $search, mode: insensitive } }
            { subtitle: { contains: $search, mode: insensitive } }
            { handle: { contains: $search, mode: insensitive } }
          ]
        }
        take: $limit
      ) {
        id
        title
        handle
        thumbnail
        productVariants(take: 1) {
          id
          title
          prices(take: 1) {
            id
            amount
            currency {
              code
            }
          }
        }
      }
    }
  `;

  console.log('Querying GraphQL for "Sweater"...');
  const data = await client.request(SEARCH_QUERY, { search: 'Sweater', limit: 8 });
  console.log('Result:', JSON.stringify(data, null, 2));

  console.log('Querying GraphQL for lowercase "sweater"...');
  const data2 = await client.request(SEARCH_QUERY, { search: 'sweater', limit: 8 });
  console.log('Result:', JSON.stringify(data2, null, 2));
}

test().catch(console.error);
