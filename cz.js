var fucking_eu_localizations = {
	t:'Tento web používá k poskytování služeb, personalizaci reklam a analýze návštěvnosti soubory cookie. Používáním tohoto webu s tím souhlasíte.',
	a:'Souhlasím',
	m:'Vice informací',
	l:'https://www.google.com/intl/cs/policies/technologies/cookies/'
};
// @koala-append "cookies.js"

(function(fucking_eu_localizations, w, d){
	function init() {
		console.log(d.readyState);
		if ( d.readyState === 'complete' ) {
			setTimeout( dry );
		} else {
			d.addEventListener( 'DOMContentLoaded', completed, false );
			w.addEventListener( 'load', completed, false );
		}
	};

	function completed() {
		d.removeEventListener( 'DOMContentLoaded', completed, false );
		w.removeEventListener( 'load', completed, false );
		dry();
	}

	function dry(){
		var html = '<div class="fucking-eu-cookies">'+
	    '<span>%t <a href="%l">%m</a></span> '+
	    '<button>%a</button>'+
		'</div>';
		html = html
			.replace('%t', fucking_eu_localizations.t)
			.replace('%l', fucking_eu_localizations.l)
			.replace('%m', fucking_eu_localizations.m)
			.replace('%a', fucking_eu_localizations.a);
		var body = d.body;
		var div = d.createElement('div');
		div.innerHTML = html;
		body.insertBefore(div, body.firstChild);
		var date = new Date();
		date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
		var expires = '; expires=' + date.toGMTString();
		d.cookie = 'fucking-eu-cookies=1' + expires + '; path=/';
	}

	init();
})(fucking_eu_localizations, window, window.document);