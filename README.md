Lab instructions:

# Install Node
# Create a project directory.
3. Initialize npm

    ```
    npm init
    ```
    
4. Install ciscospark

    ```
    npm install --save ciscospark
    ```
    
5. Install webpack

    ```
    npm install webpack
    ```
    
6. Register a new application in the developer portal (Integration)
7. Create a file named index.js in your project
8. Require ciscospark in index.js

    ```
    var spark = require('ciscospark');
    ```
    
9. kick off a login flow in index.js

    ```
    spark.authorize()
    ```
    
10. Store the response from cisco

    ```
    spark.on('change:authorization', function() {
      localStorage.setItem('credentials', JSON.stringify(spark.credentials));
    });
    ```
    
11. Refresh tokens

    ```
    var credentials = localStorage.getItem('credentials');
    if (credentials) {
      spark.credentials.set(JSON.parse(credentials));
      spark.authorize()
        .then(function() {
          // spark is authorized, you can begin making requests.
        });
    }
    ```
    
12. To start listening for calls

    ```
      spark.phone.register();
    ```
    
13. Cache credentials between page load:

    ```
      spark.on('change:credentials', function() {
        localStorage.setItem('credentials', JSON.stringify(spark.credentials));
      });
      spark.on('change:device', function() {
        localStorage.setItem('device', JSON.stringify(spark.device));
      });
    ```
    
14. Place a call

    ```
    const call = spark.phone.dial('alice@example.com');
    call.on('connected', function() {
      document.getElementById('incoming-video').src = call.remoteMediaStreamUrl;
    });
    call.on('localMediaStream:change', function() {
      document.getElementById('outgoing-video').src = call.localMediaStreamUrl;
      // Mute the local video so you don't hear yourself speaking
      document.getElementById('outgoing-video').muted = true;
    });
    ```
    
15. Listen for calls

    ```
    spark.phone.on('call:incoming', function(call) {
      // Set up listeners to update the UI if the callee chooses to answer the call.
      call.on('connected', function() {
        document.getElementById('incoming-video').src = call.remoteMediaStreamUrl;
      });
      call.on('localMediaStream:change', function() {
        document.getElementById('outgoing-video').src = call.localMediaStreamUrl;
        // Mute the local video so you don't hear yourself speaking
        document.getElementById('outgoing-video').muted = true;
      });
    
      // Let the caller know that you've indicated to the callee that there's an incoming call
      call.acknowledge();
    
      // Answer the call
      call.anwser();
    });
    ```
    
16. Create your html document

    ```
      <!DOCTYPE html>
      <html>
      <head>
          <title>Example</title>
          <meta charset="utf8">
      </head>
      <body>
      <h1>Outgoing video</h1>
      <main id="outgoing-video"></main>
      
      <h1>Incoming video</h1>
      <main id="incoming-video"></main>
      
      <script src="bundle.js"></script>
      </body>
      </html>
    ```
    
17. Create webpack.config.js with this content

    ```
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
                    'CISCOSPARK_CLIENT_ID': 'your client id',
                    'CISCOSPARK_CLIENT_SECRET': 'your client secret',
                    'CISCOSPARK_REDIRECT_URI': 'your redirect uli',
                    'CISCOSPARK_SCOPES': 'your scopes'
                }
            })
        ]
    };
    ```
    
18. make the bundle

    ```
      webpack
    ```
    
19. Deploy the app to the url you used as the redirect URL and open index.html in a browser.