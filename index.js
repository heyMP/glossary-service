const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${process.env.MONGO_URL}/glossary`, {useNewUrlParser: true});

const Term = mongoose.model('Term', { name: String, definition: String });

const typeDefs = gql`
  type Term {
    id: ID
    name: String
    definition: String
  }

  type Query {
    term(name: String): Term
    terms: [Term]
  }

  type Mutation {
    updateTerm(name: String, definition: String): Term
    deleteTerm(name: String): Term
  }
`;

const resolvers = {
  Query: {
    terms: async () => await Term.find().exec(),
    term: async (parent, { name, id }) =>  await Term.findOne({ name: "test" }).exec()
  },
  Mutation: {
    updateTerm: async (parent, { name, definition }, context, info) => 
      await Term.findOneAndUpdate({ name }, { name, definition }, { upsert: true, useFindAndModify: false, new: true }).exec(),
    deleteTerm: async (parent, { name }, context, info) =>
      await Term.findOneAndDelete({ name }).exec()
  }
};

const server = new ApolloServer({ cors: true, typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
