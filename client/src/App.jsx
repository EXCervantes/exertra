import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";

// import LeftNav from "./components/LeftNav"
import Navbar from "./components/Navbar";
import Map from "./components/Map";

// Main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Middleware for handling the JWT token
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Execute the authLink middleware for the client prior to a request to GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <>
        <main>
          <Navbar />
          <Outlet />
          <Map />
          {/* <LeftNav/> */}
        </main>
      </>
    </ApolloProvider>
  );
};

export default App;
