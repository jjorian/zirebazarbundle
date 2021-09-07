import { ApolloClient, InMemoryCache, HttpLink, createHttpLink } from '@apollo/client';
import { API_BASE_URL } from "../constants/GlobalConstants";

const makeApolloClient = (id, token) => {

    const link = new HttpLink({
        uri: API_BASE_URL + `graphql`,
        headers: {
            Authorization: `Bearer ${token}`,
            UID: id,
        }
    });
    // create an inmemory cache instance for caching graphql data
    const cache = new InMemoryCache()
    // instantiate apollo client with apollo link instance and cache instance
    const client = new ApolloClient({
        link,
        cache
    });
    return client;
}
export default makeApolloClient;