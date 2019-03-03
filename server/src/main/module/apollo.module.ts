import {
  ApolloServer,
  makeExecutableSchema,
  SchemaDirectiveVisitor
} from 'apollo-server-express';
import { typeDefs, resolvers } from '../../api';
import { schemaDirectives } from '../../api/directives';
import { GraphQLFormattedError } from 'graphql';

export default class ApolloClass {
  private _app;

  constructor(app: Express.Application) {
    this._app = app;
    this.setApollo();
  }

  /**
   * Setter method form apollo server
   */
  setApollo() {
    const schema = makeExecutableSchema({ typeDefs: [typeDefs], resolvers });

    const config = {
      schema,
      context: ({ req }) => {
        const {
          headers: { authorization: token }
        } = req;

        return {
          authInfo: {
            token
          }
        };
      },
      formatResponse: this.formatResponseFn,
      formatError: this.formatErrorFn
    };

    new ApolloServer(config).applyMiddleware({ app: this._app });

    SchemaDirectiveVisitor.visitSchemaDirectives(schema, schemaDirectives);
  }

  /**
   * Custom formatter for errors
   * @param error from resolver
   */
  formatErrorFn(error): GraphQLFormattedError {
    const extensions = error.extensions;
    const errors =
      extensions.exception && extensions.exception.errors
        ? extensions.exception.errors
        : {};

    // return {

    //   // code: extensions.code,
    //   message: error.message,
    //   stack: errors
    // };
    return error;
  }

  /**
   * Custom formatter for response
   * @param response response from resolver
   */
  formatResponseFn(response) {
    return response.data ? response : { errors: response.errors };
  }
}

export const ApolloModule = { ApolloClass };
