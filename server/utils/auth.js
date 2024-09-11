const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),
    authMiddleware: function ({ req }) {
        let token = req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const verify = jwt.verify(token, secret, { maxAge: expiration });
            console.log(verify)
            req.user = verify.authenticatedPerson || verify.data;
            console.log(token)
            console.log(req.user)
        } catch {
            console.log('Invalid token');
        }

        return req;
    },
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        console.log({ payload })
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
