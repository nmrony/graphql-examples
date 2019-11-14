import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Button, Loading } from "../components";
import { GET_LAUNCH } from "./cart-item";

const BOOK_TRIPS = gql`
  mutation BookTrips($launchIds: [ID]!) {
    bookTrips(launchIds: $launchIds) {
      success
      message
      launches {
        id
        isBooked
      }
    }
  }
`;

export default function BookTrips({ cartItems }) {
  const [bookTrips, { data, loading, error }] = useMutation(BOOK_TRIPS, {
    variables: {
      launchIds: cartItems.map(launchId => launchId)
    },
    refetchQueries: cartItems.map(launchId => ({
      query: GET_LAUNCH,
      variables: { launchId }
    })),

    update(cache) {
      cache.writeData({ data: { cartItems: [] } });
    }
  });
  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;

  return data && data.bookTrips && !data.bookTrips.success ? (
    <p data-testid="message">{data.bookTrips.message}</p>
  ) : (
    <Button onClick={bookTrips} data-testid="book-button">
      Book All
    </Button>
  );
}
