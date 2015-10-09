(function(w, d){
	var identificator = 'fucking-eu-cookies';
	var userVariable = 'fucking_eu_config';
	var noShowEvent = 'no-show';
	var showEvent = 'show';
	var hideEvent = 'hide';
	var consentReason = 'consent';

	var includes = <%= JSON.stringify({
				css: css,
				l18n: l18n,
				options: options
			}, null, '\t') %>;

	var config = {};
        

	function init() {
		w[userVariable] = w[userVariable] || {};
		config = buildConfig(includes, w[userVariable]);

		invokeEvent('init');

		if(d.cookie.indexOf(identificator) !== -1) {
			invokeEvent(noShowEvent, consentReason);
			return;
		}

		if(navigator.CookiesOK) {
			addCookie( 'auto-CookiesOK' );
			invokeEvent(noShowEvent, 'plugin CookieOK');
			return;
		}

		if( !w.addEventListener ) {
			//To keep things simple are old browsers unsupported
			invokeEvent(noShowEvent, 'unsupported browser');
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
		invokeEvent(showEvent);

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
		div.className = identificator + ' fucking-priority';
		div.innerHTML = html;
		head.appendChild(style);
        if (includes.options.append) {
            $(body).append(div);
        } else {
            body.insertBefore(div, body.firstChild);
        }
		div.getElementsByTagName('button')[0].addEventListener('click', function(){ consent( div ); });
		var a = div.getElementsByTagName('a')[0];
		a.addEventListener('click', function(){ invokeEvent('open-more'); });
		if(config.options.popupMore) {
			a.setAttribute('target', '_blank');
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

	function invokeEvent( action, label ) {
		if (typeof(config.options.callback) === 'function') {
			config.options.callback( action, label );
		}
		var dataLayer = config.options.dataLayerName;
		if (dataLayer && w[dataLayer] && typeof(w[dataLayer].push) === 'function') {
			w[dataLayer].push({
				'event': identificator,
				'action': action,
				'label': label
			});
		}
	}

	function consent( div ) {
		d.body.removeChild( div );
		invokeEvent(hideEvent, consentReason);
		addCookie();
	}

	function addCookie( reason ) {
		if (typeof reason === 'undefined') {
			reason = '1';
		}
		var date = new Date();
		date.setFullYear(date.getFullYear() + 1);
		var expires = '; expires=' + date.toGMTString();
		d.cookie = identificator + '=' + encodeURIComponent(reason) + expires + '; path=/';
	}

	init();

})(window, window.document);
