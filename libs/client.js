const {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
} = require("@apollo/client");

const client = new ApolloClient({
  uri: "https://classicportfolio-api.vercel.app/portfolio",
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "http://localhost:4000/portfolio",
//   cache: new InMemoryCache(),
// });

export { client, ApolloProvider };
