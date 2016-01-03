# Fucking EU cookies
One-file zasraná hláška pro zasranou EU, v jednom scriptu, 1,5 kB, 1 request, TLS (SSL), asynchronní, hostováno
na [S3](https://aws.amazon.com/s3/), CDN před [CloudFront](https://aws.amazon.com/cloudfront/), bez závislosti na jQuery, s podporou Tag manageru a navrženo se záměrem nejméně obtěžovat uživatele.

*[EN] Sorry, this readme is currently possible only in Czech, because main target users are in CZ.*

## Instalace
Pro nainstalování tohoto rozšíření stačí do stránky vložit následující kód:
```html
<script src="//d2z9iq901qkqk8.cloudfront.net/cz.js" async></script>
```
Kód můžete vložit kamkoliv do stránky, ale nejlépe někam mezi `<head>` a `</head>`.

Takto nainstalovaná knihovna má funkce:
* zobrazení lišty v horní části stránky,
* poučení uživatele o ukládání cookies, jak zasraná EU káže,
* po stisknutí tlačítka souhlasu uložení cookie, aby se lišta po dobu 1 roku již nezobrazila,
* respektuje některá rozšíření pro automatické odsouhlasení.

## Úpravy vzhledu
Vzhled lišty lze snadno upravit nastavením vlastností pro třídu `.fucking-eu-cookies`, abyste převážili výchozí nastavení, možná bude potřeba odkazovat se na `.fucking-eu-cookies.fucking-priority`.

Příklad změny na fixní verzi – užitečné v situaci, kdy základní vzhled rozbíjí layout stránky:
```css
.fucking-eu-cookies.fucking-priority {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
}
```
Obdobně můžete upravit i následující prvky: `.fucking-eu-cookies.fucking-priority span` pro text, `.fucking-eu-cookies.fucking-priority a` pro odkaz na *Více informací* a `.fucking-eu-cookies.fucking-priority button` pro tlačítko.

## Úpravy funkčnosti
Lištu lze konfigurovat pomocí konfigurační proměnné `fucking_eu_config`.

### Změny textace
Textaci lze konfigurovat parametrem `l18n`, tedy např. změna popisu tlačítka:
```html
<script>
	var fucking_eu_config = {
		"l18n": {
			"accept": "OK"
		}
	};
</script>
```
Takto lze přepsat všechny výchozí hodnoty ze souboru [source/l18n.cz.json](source/l18n.cz.json).

### Nastavení chování
Chování lze konfigurovat parametrem `options`, tedy např. zobrazování informací v novém okně:
```html
<script>
	var fucking_eu_config = {
		"options": {
			"popupMore": true
		}
	};
</script>
```
Takto lze přepsat všechny výchozí hodnoty ze souboru [source/options.json](source/options.json).

#### Umístění lišty v kódu
Ve výchozím nastavení se lišta vykresluje na na začátek stránky (jako první potomek `<body>`), parametrem `insertTo` lze upravit toto chování. Pokud hodnotu nastavíte na `'body-begin'` nebo `'body-end'`, vloží se lišta na začátek/konec stránky. Pokud zadáte jinou hodnotu, zkusí se najít takový element podle `id` a vloží lištu na jeho konec.  
**Upozornění:** Pokud nebude element s daným ID v DOM stránky nalezen, lišta se nezobrazí, ale nezobrazí se žádné varování.
```html
<script>
	var fucking_eu_config = {
		"options": {
			"insertTo": "myPlaceForCookie"
		}
	};
</script>
…
<dic id="myPlaceForCookie"><!-- Panel will be place here --></a>
```

#### Callback a propojení s Google Tag Manager
Pomocí parametrů `callback` a `dataLayerName` lze sledovat události lišty. Callback se hodí zejména pro sladění složitějšího designu stránky (když, např. zobrazená lišta překrývá stránku), dataLayer pak posílá eventy pro měření uživatelského chování. Obě funkce jsou na sobě nezávislé, lze použít jednu z nich a nebo obě. Nicméně obě dostávají stejná data.

Callback předává dva parametry, `action` s názvem události (možné hodnoty: `'init'`,`'show'`,`'no-show'`,`'hide'` a `'open-more'`) a `label` s dalšími informacemi (např.: důvod nezobrazení lišty u akce `'no-show'`). Příklad:

```html
<script>
	function myCallback( action, label ) {
		console.log(action, label);
		// Example output: 'no-show', 'unsupported browser'
	}
	var fucking_eu_config = {
		"options": {
			"callback": myCallback
		}
	};
</script>
```

Do Google Tag Manageru pak provolává event nazvaný `fucking-eu-cookies` se stejnými parametry jako Callback. Příklad:
```html
<script>
	var dataLayer = [];
	var fucking_eu_config = {
		"options": {
			"dataLayerName": 'dataLayer' // Note: input variable name (in 'quotes'), no variable directly
		}
	};
	// Example event values: {event: 'fucking-eu-cookies', action: 'no-show', label: 'unsupported browser'}
</script>
```
Více o použití proměnné `dataLayer` v GTM najdete v [dokumentaci](https://developers.google.com/tag-manager/devguide?hl=en#events) a nebo v článku [Variable Guide](http://www.simoahava.com/analytics/variable-guide-google-tag-manager/).

Tento kód uveďte vždy před voláním lišty, tedy např.:
```html
<script>
	var fucking_eu_config = { … };
</script>
<script src="//d2z9iq901qkqk8.cloudfront.net/cz.js" async></script>
```

## Obtěžování uživatele
Uvědumuju si, že zasrané nařízení je zcela zbytečné a nesmyslné. Nedává mi proto smysl upozornění dělat obzvlášť výrazné a obtěžující.
Z toho důvodu je lišta:
* psaná malým písmem,
* v nevýrazných barvách (které jsou převzaty z barev systémových lišt),
* nemá fixní pozici, aby se dala odrolovat pryč,
* respektuje některé nejoblíbenější rozšíření pro blokování reklam a takovýchto EU hlášek (má se za to, že instalací nástroje na jejich blokování již uživatel vyjádřil globálně plošný souhlas a je náležitě informován).

## Známé problémy
Text splňuje zasrané požadavky zasrané EU s drobným nedostatkem, že cookies se pravděpodobně do počítače uživatele uloží dříve, než tento vyjádří souhlas, nebo než se s požadovanou informací seznámí. Lišta totiž **vytváření cookies neomezuje**, pouze zajišťuje informování uživatelů a získání jejich tichého souhlasu. Jednoduchost instalace je vykoupena právě tímto nedostatkem.

Problémy zobrazení:
* Na webech s obrázkem na pozadí stránky, které je pozicované vůči prvkům ve stránce, může lišta způsobit rozpad layoutu.
* Na webech s nenulovým marginem/paddingem stránky, ve kterém ale design do krajů zasahuje, může lišta vypadat hodně ošklivě.
V obou případech pak doporučuji ve stránce doplnit stylopis, který lištu změni na fixně pozicovanou.

Podpora browserů počítá pouze s moderními browsery. V zastaralých verzích se může lišta zobrazit nesprávně a nebo může zcela chybět.
Záleží mi na tom, aby se ani ve starších verzích nic nerozbilo. Pokud se lišta zobrazila opravdu chybně, prosím o nahlášení.

Připojovaný soubor má nastaveno velmi dlouhé cachování, aby tento soubor byl v koncových stanicích ukládán co nejdéle. Výhodou je velmi rychlé načítání. Nevýhodou je poměrně velký rozptyl verzí, které mohou mít v jednom okamžiku uživatelé na počítači. Při modifikacích a ovládání lišty dbejte na doporučení v návodech, které zohledňují zpětnou kompatibilitu.

## Zabezpečení
Knihovna je hostována na serverech Amazonu na službě [Simple storage service](https://aws.amazon.com/s3/) a servírována přes (CloudFront CDN](https://aws.amazon.com/cloudfront/), které vynikají vysokou dostupností a zabezpečením. Protože se jedná o script vkládaný do stránky, byla zvoleno toto řešení právě s ohledem na zabezpečení minimalizující možnosti neautorizovaného přístupu.

## Changelist
Look here: https://github.com/jakubboucek/fucking-eu-cookies/releases

## Poděkování
* [Davidovi Grudlovi](https://davidgrudl.com/) za nakopnutí článkem [Jak na souhlas s cookie ve zkurvené EU](https://phpfashion.com/jak-na-souhlas-s-cookie-ve-zkurvene-eu),
* [Michalovi Špačkovi](https://www.michalspacek.cz) za tip na bonznutí lišty do různých AdBlocků (připomínám: záměr je co nejméně obtěžovat uživatele),
* [Bohumilu Jahodovi](http://jecas.cz/) za [upozornění](https://twitter.com/Jahoda/status/633970094218080257) za nepříjmenou chybu.
