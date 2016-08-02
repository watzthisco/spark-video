var spark = require('ciscospark');

spark.authorize();

spark.on('change:authorization', function() {
    localStorage.setItem('credentials', JSON.stringify(spark.credentials));
});
spark.on('change:credentials', function() {
    localStorage.setItem('credentials', JSON.stringify(spark.credentials));
});
spark.on('change:device', function() {
    localStorage.setItem('device', JSON.stringify(spark.device));
});
var credentials = localStorage.getItem('credentials');
if (credentials) {
    spark.credentials.set(JSON.parse(credentials));
    spark.authorize()
        .then(function() {
            // spark is authorized, you can begin making requests.

            spark.phone.register();

            //make a call

            const call = spark.phone.dial('info@watzthis.com');
            call.on('connected', function() {
                document.getElementById('incoming-video').src = call.remoteMediaStreamUrl;
            });
            call.on('localMediaStream:change', function() {
                document.getElementById('outgoing-video').src = call.localMediaStreamUrl;
                // Mute the local video so you don't hear yourself speaking
                document.getElementById('outgoing-video').muted = true;
            });

        });
}

