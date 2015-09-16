# Fucking EU cookies
One-file zasraná hláška pro zasranou EU, v jednom scriptu, 1kB, 1 request, TLS (SSL), asynchronní, hostováno na [S3](https://aws.amazon.com/s3/), bez
závislosti na jQuery a navrženo se záměrem nejméně obtěžovat uživatele.

*[EN] Sorry, this readme is currently possible only in Czech, because main target users are in CZ.*

## Instalace
Pro nainstalování tohoto rozšíření stačí do stránky vložit následující kód:
```html
<script src="//s3-eu-west-1.amazonaws.com/fucking-eu-cookies/cz.js" async></script>
```
Kód můžete vložit kamkoliv do stránky, ale nelépe někam mezi `<head>` a `</head>`.

Takto nainstalovaná knihovna má funkce:
* zobrazení lišty v horní části stránky,
* poučení uživatele o ukládání cookies, jak zasraná EU káže,
* po stisknutí tlačítka souhlasu uložení cookie, aby se lišta do dobu 1 roku již nezobrazila,
* respektuje některá rozšíření pro automatické odsouhlasení.

## Úpravy vzhledu a funkčnosti
Vzhled lišty lze snadno upravit nastavením vlastností pro třídu `.fucking-eu-cookies`, abyste převážili výchozí nastavení, možná bude potřeba odkazovat se na  `.fucking-eu-cookies.fucking-priority`.

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

Obdobně lze upravit funkci, například vynucení otevírání odkazu do nového okna (vyžaduje nejméně [jQuery v1.7](http://api.jquery.com/on/)):
```js
$( document ).on( "click", ".fucking-eu-cookies a", function( e ) {
	if( window.open( this.href ) ) {
		e.preventDefault();
	}
});
```
([ukázka](https://jsfiddle.net/Lzg0wmb1/))

## Obtěžování uživatele
Uvědumuju si, že zasrané nařízení je zcela zbytečné a nesmyslné. Nedává mi proto smysl upozornění dělat obzvlášť výrazné a obtěžující.
Z toho důvodu je lišta:
* psaná malým písmem,
* v nevýrazných barvách (které jsou převzaty z barev systéových lišt),
* nemá fixní pozici, aby se dala odrolovat pryč,
* respektuje některé nejoblíbenější rozšíření pro blokování reklam a takovýchto EU hlášek (má se za to, že instalací nástroje na jejich blokování již uživatel vyjádřil globálně plošný souhlas a je náležitě informován).

## Známé problémy
Text splňuje zasrané požadavky zasrané EU s drobným nedostatkem, že cookies se pravděpodobně do počítače uživatele uloží dříve, než tento vyjádří souhlas, nebo než se s požadovanou informací seznámí. Lišta totiž **vytváření cookies neomezuje**, pouze zajišťuje informování uživatelů a získání jejich tichého souhlasu. Jednoduchost instalace je vykoupena právě tímto nedostatkem.

Problémy zobrazení:
* Na webech s obrázkem na pozadí stránky, které je pozicované vůči prvkům ve stránce, může lišta způsobit rozpad layoutu.
* Na webech s nenulovým marginem/paddingem stránky, ve kterém ale design do krajů zasahuje, může lišta způsobit vypadat hodně ošklivě.
V obou případech pak doporučuji ve stránce doplnit stylopis, který lištu změni na fixně pozicovanou.

Podpora browserů počítá pouze s moderními browsery. V zastaralých verzích se může lišta zobrazit nesprávně a nebo může zcela chybět.
Záleží mi na tom, aby se ani ve starších verzích nic nerozbilo. Pokud se lišta zobrazila opravdu chybně, prosím o na hlášení.

Připojovaný soubor má nastaveno velmi dlouhé cachování, aby tento soubor byl v koncových stanicích ukládán co nejdéle. Výhodou je velmi rychlé načítání. Nevýhodou je poměrně velký rozptyl verzí, které mohou mít v jednom okamžiku uživatelé na počítači. Při modifikacích a ovládání lišty dbejte na doporučení v návodech, které zohledňují zpětnou kompatibilitu.

## Zabezpečení
Knihovna je hostována na serverech Amazonu na službě [Simple storage service](https://aws.amazon.com/s3/), která vyniká vysokou dostupností a zabezpečením. Protože se jedná o script vkládaný do stránky, byla zvoleno toto řešení právě s ohledem na zabezpečení, které minimalizuje možnosti neautorizovaného přístupu k tomuto souboru.

## Changelist
### 0.1.3
* Added slovak language (thanks to [OndroNR](https://github.com/OndroNR))

## Plánovaná podpora a vývoj
U současné verze je plánován vývo **pouze** v tomto rozsahu (vše se zachováním zpětné kompatibility):
* opravy a vylepšení kompatibility,
* doplnění podpory customizace textace,
* podpora více nástrojů na automatické potlačování otravných prvků na webu (nejčstěji rozšíření do browseru),
* podpora [GTM](https://tagmanager.google.com) pro zachytávání eventů do Analytics.

## Poděkování
* [Davidovi Grudlovi](https://davidgrudl.com/) za nakopnutí článkem [Jak na souhlas s cookie ve zkurvené EU](https://phpfashion.com/jak-na-souhlas-s-cookie-ve-zkurvene-eu),
* [Michalovi Špačkovi](https://www.michalspacek.cz) za tip na bonznutí lišty do různých AdBlocků (připomínám: záměr je co nejméně obtěžovat uživatele),
* [Bohumilu Jahodovi](http://jecas.cz/) za [upozornění](https://twitter.com/Jahoda/status/633970094218080257) za nepříjmenou chybu.
