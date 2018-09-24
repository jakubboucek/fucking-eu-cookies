(function (w) {
    var identificator = 'fucking-eu-cookies';

    var config = <%= JSON.stringify({
        version: pkg.version,
        l18n: l18n
    }, null, '\t') %>;

    w[identificator] = {
        version: config.version,
    };

    function shutdownAlert() {
        var message = config.l18n.shutdownNotice + " (" + identificator + " v" + config.version + ")";

        if (console) {
            console.error(message);
        }

        //throw new Error(message);
    }

    shutdownAlert();

})(window);
