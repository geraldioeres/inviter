import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://present-pelican-78.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "EArmSp0hEnY4LweUuoHX8obur30pN6wxIuHmAIQdFXt8eXIec4DDvTbU3a5dKGsr",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://present-pelican-78.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "EArmSp0hEnY4LweUuoHX8obur30pN6wxIuHmAIQdFXt8eXIec4DDvTbU3a5dKGsr",
      },
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
