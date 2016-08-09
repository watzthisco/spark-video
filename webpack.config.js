var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'CISCOSPARK_CLIENT_ID': '"C0c905e0e09739a7d741ba29cd11d029200c94c4aa28e1ebebcd0d9c4301536c5"',
                'CISCOSPARK_CLIENT_SECRET': '"58da597b9d2d0f30dff3d6e4d1339efd2581c2d61a29d91aaacda3fc1f7032a8"',
                'CISCOSPARK_REDIRECT_URI': '"http://tropo.watzthis.com"',
                'CISCOSPARK_SCOPES': '"webexsquare:get_conversation Identity:SCIM"'
            }
        })
    ]
};


/*
'CISCOSPARK_SCOPES': '"spark:people_read,spark:rooms_read,spark:rooms_write,spark:memberships_read,spark:memberships_write,spark:messages_read,spark:messages_write,spark:teams_read,spark:teams_write,spark:team_memberships_read,spark:team_memberships_write"'
*/
