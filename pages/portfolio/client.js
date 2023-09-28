const {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://localhost:4000/portfolio",
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
