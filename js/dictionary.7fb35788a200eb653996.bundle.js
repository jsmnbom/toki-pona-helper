!function(e){function t(t){for(var n,o,i=t[0],a=t[1],u=0,l=[];u<i.length;u++)o=i[u],r[o]&&l.push(r[o][0]),r[o]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(c&&c(t);l.length;)l.shift()()}var n={},r={1:0};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise(function(t,o){n=r[e]=[t,o]});t.push(n[2]=i);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(e){return o.p+"js/"+({}[e]||e)+"."+{4:"b92c63eb072f29d97582",5:"b444e43f822cacc43143",6:"3040534850eadb4b63f7",7:"300b4fc1c2a64e2b31d8"}[e]+".chunk.js"}(e),a=function(t){u.onerror=u.onload=null,clearTimeout(c);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+o+": "+i+")");a.type=o,a.request=i,n[1](a)}r[e]=void 0}};var c=setTimeout(function(){a({type:"timeout",target:u})},12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=a;o(o.s=22)}({1:function(e,t,n){"use strict";var r=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}c((r=r.apply(e,t||[])).next())})},o=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},i=function(){function e(e,t){this.tokipona=e.tokipona,t&&(this.tokipona=this.tokipona.replace(/\s(\(e \))?$/g,"")),this.class=e.class.trim(),this.definitions=e.english.split(/,/).map(function(e){return e.trim()})}return e.prototype.formatClass=function(){return-1!==["verb transitive","verb intransitive"].indexOf(this.class)?this.class.split(" ").reverse().join(" "):this.class},e}(),a=function(){function e(){}return e.getOfficial=function(e){return void 0===e&&(e=!0),r(this,void 0,void 0,function(){return o(this,function(t){switch(t.label){case 0:return[4,n.e(4).then(n.t.bind(null,12,7))];case 1:return[2,t.sent().default.map(function(t){return new i(t,e)})]}})})},e.getWords=function(){return r(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,n.e(7).then(n.t.bind(null,13,7))];case 1:return[2,e.sent().default.map(function(e){return e})]}})})},e.getProperNouns=function(){return r(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,n.e(5).then(n.t.bind(null,14,7))];case 1:return[2,e.sent().default.map(function(e){return e})]}})})},e.getSentences=function(){return r(this,void 0,void 0,function(){return o(this,function(e){switch(e.label){case 0:return[4,n.e(6).then(n.t.bind(null,15,7))];case 1:return[2,e.sent().default.map(function(e){return e})]}})})},e}();t.a=a},22:function(e,t,n){"use strict";n.r(t);var r=n(1),o=function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function u(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,u)}c((r=r.apply(e,t||[])).next())})},i=function(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},a=function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}},u=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},c=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(u(arguments[t]));return e};var l=function(){function e(e){this.data=e}return e.prototype.search=function(e){var t,n,r,o,i=RegExp("\\b"+e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","gi");console.log(i);var u=[];try{for(var c=a(this.data),l=c.next();!l.done;l=c.next()){var s=l.value,f=[];try{for(var p=a([s.tokipona.replace(/\s(\(e \))?$/g,""),s.english]),h=p.next();!h.done;h=p.next()){for(var d=h.value,y=0;null!==i.exec(d);)y++;y>0&&f.push(y*(500/y-d.length))}}catch(e){r={error:e}}finally{try{h&&!h.done&&(o=p.return)&&o.call(p)}finally{if(r)throw r.error}}if(0!=f.length){var v=1==f.length?f[0]:(f[0]+f[1])/2;v>0&&u.push([v,s])}}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}return u.sort(function(e,t){return e[0]<t[0]?1:-1}),console.log(u),u.map(function(e){return e[1]})},e}(),s=function(){function e(){}return e.prototype.run=function(){return o(this,void 0,void 0,function(){var e,t,n,o,u,s,f,p,h,d,y,v,b,g,w,m,x=this;return i(this,function(i){switch(i.label){case 0:n=[],i.label=1;case 1:return i.trys.push([1,6,7,8]),[4,r.a.getOfficial(!1)];case 2:o=a.apply(void 0,[i.sent()]),u=o.next(),i.label=3;case 3:if(u.done)return[3,5];s=u.value,n.push({tokipona:s.tokipona,english:s.formatClass()+": "+s.definitions.join(", ")}),i.label=4;case 4:return u=o.next(),[3,3];case 5:return[3,8];case 6:return f=i.sent(),e={error:f},[3,8];case 7:try{u&&!u.done&&(t=o.return)&&t.call(o)}finally{if(e)throw e.error}return[7];case 8:return h=(p=n.push).apply,d=[n],[4,r.a.getProperNouns()];case 9:return h.apply(p,d.concat([c.apply(void 0,[i.sent()])])),v=(y=n.push).apply,b=[n],[4,r.a.getSentences()];case 10:return v.apply(y,b.concat([c.apply(void 0,[i.sent()])])),w=(g=n.push).apply,m=[n],[4,r.a.getWords()];case 11:return w.apply(g,m.concat([c.apply(void 0,[i.sent()])])),this.searcher=new l(n),document.getElementById("search").addEventListener("submit",function(e){e.preventDefault();var t=new FormData(e.target).get("query");t&&x.search(t).catch(function(e){console.error(e)})}),this.table=document.getElementById("table"),[2]}})})},e.prototype.search=function(e){return o(this,void 0,void 0,function(){var t,n,r,o,u,c,l,s;return i(this,function(i){console.log("Searched for:",e),r=document.createElement("tbody"),o=this.searcher.search(e);try{for(u=a(o),c=u.next();!c.done;c=u.next())l=c.value,(s=r.insertRow(-1)).insertCell(-1).innerHTML=l.tokipona,s.insertCell(-1).innerHTML=l.english}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=u.return)&&n.call(u)}finally{if(t)throw t.error}}return this.table.replaceChild(r,this.table.tBodies[0]),[2]})})},e}();document.addEventListener("DOMContentLoaded",function(){(new s).run().catch(function(e){console.error(e)})})}});
//# sourceMappingURL=dictionary.7fb35788a200eb653996.bundle.js.map