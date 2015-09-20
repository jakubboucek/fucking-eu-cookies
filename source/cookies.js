(function(w, d){
	var cookieName = 'fucking-eu-cookies';
	var userVariable = 'fucking_eu_config';

	var includes = <%= JSON.stringify({
				css: css,
				l18n: l18n,
				options: options
			}, null, '\t') %>;

	var config = {};

	function init() {
		if(d.cookie.indexOf(cookieName) !== -1) {
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

		w[userVariable] = w[userVariable] || {};
		config = buildConfig(includes, w[userVariable]);

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
			.replace('%t', config.l18n.text)
			.replace('%l', config.l18n.link)
			.replace('%m', config.l18n.more)
			.replace('%a', config.l18n.accept);
		var body = d.body;
		var head = d.head;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(d.createTextNode(includes.css));

		var div = d.createElement('div');
		div.className = cookieName + ' fucking-priority';
		div.innerHTML = html;
		head.appendChild(style);
		body.insertBefore(div, body.firstChild);
		div.getElementsByTagName('button')[0].addEventListener('click', function(){ consent( div ); });
		if(config.options.popupMore) {
			div.getElementsByTagName('a')[0].setAttribute('target', '_blank');
		}
	}

	function buildConfig(defaults, mods) {
		var config = {};
		for(key in defaults) {
			if( typeof mods[key] === 'undefined' ) {
				config[key] = defaults[key];
			}
			else if(typeof mods[key] === 'object'){
				config[key] = buildConfig(defaults[key], mods[key]);
			}
			else {
				config[key] = mods[key];
			}
		}
		return config;
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
		d.cookie = cookieName + '=' + encodeURIComponent(reason) + expires + '; path=/';
	}

	init();

})(window, window.document);
