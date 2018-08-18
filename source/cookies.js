(function(w, d){
    const identificator = 'fucking-eu-cookies';

    const config = <%= JSON.stringify({
				version: pkg.version,
				l18n: l18n
			}, null, '\t') %>;

	function shutdownAlert() {
		d[identificator] = true;

        const message = config.l18n.shutdownNotice + " (" + identificator + " v" + config.version + ")";

        if (console) {
			console.error(message);
		}

		throw new Error(message);
	}

	shutdownAlert();

})(window, window.document);
