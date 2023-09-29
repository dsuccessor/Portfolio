const {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} = require("@apollo/client");

const client = new ApolloClient({
  uri: "http://classicportfolio-api.vercel.app/portfolio",
  cache: new InMemoryCache(),
});

export { client, ApolloProvider };
