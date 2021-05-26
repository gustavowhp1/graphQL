const { gql } = require("apollo-server");

const typeDefs = gql`
    scalar Timestamp

    type Movie {
        id: ID
        createdAt: Timestamp
        name: String
        genre: String
        country: String
        language: String
    }

    type User {
        id: ID
        name: String
    }

    type Query {
        movies: [Movie]
        getMovieByName(name: String): [Movie]
        users: [User]
        getUserByName(name: String): [User]
    }
    
    input userInput {
        name: String
    }
    
    type Mutation {
        createUser(data: userInput): User
    }
`;

module.exports = typeDefs;