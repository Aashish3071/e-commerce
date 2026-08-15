"use server"
import { gql } from "graphql-request"
import { openfrontClient } from "../config"
import { cache } from "react"

export const retrieveCollection = cache(async function (id: string) {
  const RETRIEVE_COLLECTION_QUERY = gql`
    query RetrieveCollection($id: ID!) {
      collection(where: { id: $id }) {
        id
        title
        handle
      }
    }
  `;

  return openfrontClient.request(RETRIEVE_COLLECTION_QUERY, { id });
});

export const getCollectionsList = cache(async function (offset = 0, limit = 3) {
  const GET_COLLECTIONS_LIST_QUERY = gql`
    query GetCollectionsList($offset: Int!, $limit: Int!) {
      productCollections(skip: $offset, take: $limit) {
        id
        title
        handle
        products(take: 3) {
          id
          title
          handle
          thumbnail
          productVariants {
            id
            title
            prices {
              id
              amount
              currency {
                code
              }
            }
          }
        }
      }
      productCollectionsCount
    }
  `;

  try {
    const data = await openfrontClient.request(GET_COLLECTIONS_LIST_QUERY, {
      offset,
      limit,
    });

    return {
      collections: data.productCollections || [],
      count: data.productCollectionsCount || 0,
    };
  } catch (error) {
    console.error("Error fetching collections list:", error);
    return { collections: [], count: 0 };
  }
});

export const getCollectionByHandle = cache(async function (handle: string) {
  const GET_COLLECTION_BY_HANDLE_QUERY = gql`
    query GetCollectionByHandle($handle: String!) {
      productCollection(where: { handle: $handle }) {
        id
        title
        handle
      }
    }
  `;

  try {
    return await openfrontClient.request(GET_COLLECTION_BY_HANDLE_QUERY, { handle });
  } catch (error) {
    console.error("Error fetching collection by handle:", error);
    return null;
  }
});

export const getCollectionsListByRegion = cache(async function (
  offset = 0,
  limit = 3,
  regionId: string
) {
  const GET_COLLECTIONS_LIST_QUERY = gql`
    query GetCollectionsList($offset: Int!, $limit: Int!, $regionId: ID!) {
      productCollections(skip: $offset, take: $limit) {
        id
        title
        handle
        products(
          take: 3
          where: {
            productVariants: {
              some: {
                prices: { some: { region: { id: { equals: $regionId } } } }
              }
            }
          }
        ) {
          id
          title
          handle
          thumbnail
          productVariants {
            id
            title
            prices {
              id
              amount
              currency {
                code
              }
            }
          }
        }
      }
      productCollectionsCount
    }
  `;

  try {
    const data = await openfrontClient.request(GET_COLLECTIONS_LIST_QUERY, {
      offset,
      limit,
      regionId,
    });

    return {
      collections: data.productCollections || [],
      count: data.productCollectionsCount || 0,
    };
  } catch (error) {
    console.error("Error fetching collections by region:", error);
    return { collections: [], count: 0 };
  }
});
