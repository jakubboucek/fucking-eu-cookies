/*! fucking-eu-cookies v0.1.9-kill-cdn 2017-09-05 00:00:00
 *  Copyright (c) 2017 Jakub Bouček (https://www.jakub-boucek.cz/) */
!function(a,b){function c(){return a[k]=a[k]||{},u=f(t,a[k]),g("init",t.version),-1!==b.cookie.indexOf(j)?void g(l,o):navigator[p]?(i("auto-"+p),void g(l,"plugin "+p)):a.addEventListener?void("complete"===b.readyState?setTimeout(e):(b.addEventListener(q,d,!1),a.addEventListener(r,d,!1))):void g(l,"unsupported browser")}function d(){b.removeEventListener(q,d,!1),a.removeEventListener(r,d,!1),e()}function e(){g(m);var a='<span>%t <a href="%l">%m</a></span> <button>%a</button>';a=a.replace("%t",u.l18n.text).replace("%l",u.l18n.link).replace("%m",u.l18n.more).replace("%a",u.l18n.accept);var c=b.body,d=b.head,e=document.createElement("style");e.type="text/css",e.appendChild(b.createTextNode(t.css));var f=b.createElement("div");f.className=j+" fucking-priority",f.innerHTML=a,d.appendChild(e);var i,k=u.options.insertTo;"body-begin"==k?c.insertBefore(f,c.firstChild):"body-end"==k?c.insertBefore(f,null):(i=document.getElementById(k))&&i.insertBefore(f,null),f.getElementsByTagName("button")[0].addEventListener(s,function(){h(f)});var l=f.getElementsByTagName("a")[0];l.addEventListener(s,function(){g("open-more")}),u.options.popupMore&&l.setAttribute("target","_blank")}function f(a,b){var c={};for(key in a)"undefined"==typeof b[key]?c[key]=a[key]:"object"==typeof b[key]?c[key]=f(a[key],b[key]):c[key]=b[key];return c}function g(b,c){"function"==typeof u.options.callback&&u.options.callback(b,c);var d=u.options.dataLayerName;d&&a[d]&&"function"==typeof a[d].push&&a[d].push({event:j,action:b,label:c})}function h(a){a.parentNode.removeChild(a),g(n,o),i()}function i(a){"undefined"==typeof a&&(a="1");var c=new Date;c.setFullYear(c.getFullYear()+1);var d="; expires="+c.toGMTString();b.cookie=j+"="+encodeURIComponent(a)+d+"; path=/"}var j="fucking-eu-cookies",k="fucking_eu_config",l="no-show",m="show",n="hide",o="consent",p="CookiesOK",q="DOMContentLoaded",r="load",s="click",t={version:"0.1.9-kill-cdn",css:".fucking-eu-cookies{display:flex;flex-wrap:nowrap;justify-content:center;background:Menu;align-items:center;color:GrayText;padding:5px;z-index:1000;position:relative}.fucking-eu-cookies,.fucking-eu-cookies span,.fucking-eu-cookies a{font-size:12px;font-family:'Arial','Helvetica',sans-serif}.fucking-eu-cookies span{padding-right:5px}.fucking-eu-cookies a,.fucking-eu-cookies a:hover,.fucking-eu-cookies a:visited,.fucking-eu-cookies a:active,.fucking-eu-cookies a:focus{color:GrayText;text-decoration:underline}.fucking-eu-cookies button{flex-shrink:0;cursor:pointer;font-weight:.9em}",l18n:{text:"Tento web používá k poskytování služeb, personalizaci reklam a analýze návštěvnosti soubory cookie. Používáním tohoto webu s tím souhlasíte.",accept:"Souhlasím",more:"Více informací",link:"https://www.google.com/intl/cs/policies/technologies/cookies/"},options:{popupMore:!1,callback:null,dataLayerName:null,insertTo:"body-begin"}},u={};c()}(window,window.document);