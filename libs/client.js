const {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} = require("@apollo/client");

import { setContext } from '@apollo/client/link/context';
import { getPassResetAuth, getLoginAuth } from './middleware';

const uri = process.env.NODE_ENV === 'development' ?
  'http://localhost:4000/portfolio' :
  'https://classicportfolio-api.vercel.app/portfolio'

var authLink
var token

const getAuthToken = async (tokenType) => {
  if (tokenType === "loginToken") {
    token = await getLoginAuth()
    return token
  }
  else {
    token = await getPassResetAuth()
  }
}

authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
})

 
const link = createHttpLink({
  uri: uri,
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink?.concat(link)
});



export { client, ApolloProvider, getAuthToken };
