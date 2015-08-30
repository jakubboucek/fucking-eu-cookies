(function(fucking_eu_localizations, w, d){
	var includes = <%= JSON.stringify({
				css: css
			}) %>;

	function init() {
		if(d.cookie.indexOf('fucking-eu-cookies') !== -1) {
			return;
		}

		if(navigator.CookiesOK) {
			addCookie( 'auto-CookiesOK' );
			return;
		}

		if( !w.addEventListener ) {
			//To keep things simple are old browsers unsupported
			return;
		}

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
		var html = '<span>%t <a href="%l">%m</a></span> '+
		'<button>%a</button>';
		html = html
			.replace('%t', fucking_eu_localizations.t)
			.replace('%l', fucking_eu_localizations.l)
			.replace('%m', fucking_eu_localizations.m)
			.replace('%a', fucking_eu_localizations.a);
		var body = d.body;
		var head = d.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(d.createTextNode(includes.css));

		var div = d.createElement('div');
		div.className = 'fucking-eu-cookies fucking-priority';
		div.innerHTML = html;
		head.appendChild(style);
		body.insertBefore(div, body.firstChild);
		div.getElementsByTagName('button')[0].addEventListener('click', function(){ consent( div ); });
	}

	function consent( div ) {
		d.body.removeChild( div );
		addCookie();
	}

	function addCookie( reason ) {
		if (typeof reason === 'undefined') {
			reason = '1';
		}
		var date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		var expires = '; expires=' + date.toGMTString();
		d.cookie = 'fucking-eu-cookies=' + encodeURIComponent(reason) + expires + '; path=/';
	}

	init();
})(fucking_eu_localizations, window, window.document);