/* Unified, English-keyed message catalogue. Message keys never render as identifiers. */
window.PF_I18N={
 locales:{en:'en-GB',zh:'zh-CN',es:'es-ES',de:'de-DE',fr:'fr-FR',ja:'ja-JP'},
 names:{en:'English',zh:'简体中文',es:'Español',de:'Deutsch',fr:'Français',ja:'日本語'},
 missing:new Set(),
 cache:{},
 compose(value,lang){
  if(lang==='en')return value;
  const d=window.PF_MESSAGES?.[lang]||{};
  if(!this.cache[lang]){
   const keys=Object.keys(d).filter(k=>d[k]!==k&&/[a-z]/i.test(k)).sort((a,b)=>b.length-a.length);
   const pattern=new RegExp('(?<![\\p{L}])(?:'+keys.map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\p{L}])','gu');
   this.cache[lang]={values:new Set(Object.values(d)),pattern};
  }
  if(this.cache[lang].values.has(value))return value;
  return value.replace(this.cache[lang].pattern,k=>d[k]);
 },
 translate(key,lang='en',vars={}){if(key==null)return '';key=String(key);const messages=window.PF_MESSAGES||{};let result=messages[lang]?.[key]??this.compose(messages.en?.[key]??key,lang);if(lang!=='en'&&!messages[lang]?.[key]&&result===key&&!this.cache[lang]?.values.has(key)&&/[a-z]{3}/i.test(key))this.missing.add(key);return result.replace(/\{(\w+)\}/g,(m,k)=>vars[k]??m)},
 locale(lang){return this.locales[lang]||'en-GB'},
 number(n,lang,options={}){return new Intl.NumberFormat(this.locale(lang),options).format(n)},
 date(d,lang,options={day:'numeric',month:'short'}){return new Intl.DateTimeFormat(this.locale(lang),options).format(new Date(d))},
 currency(n,lang){return new Intl.NumberFormat(this.locale(lang),{style:'currency',currency:'EUR'}).format(n)},
 localize(root,lang,oldLang){if(!root)return;const dictionary=(window.PF_MESSAGES||{})[lang]||{};const oldDictionary=(window.PF_MESSAGES||{})[oldLang]||{};const reverse=Object.fromEntries(Object.entries(oldDictionary).map(([k,v])=>[v,k]));const resolve=v=>dictionary[reverse[v]||v]||this.compose(reverse[v]||v,lang);const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){return node.parentElement?.closest('script,style,textarea,[data-user-content],[data-native-language]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}});let node;while(node=walker.nextNode()){let v=node.nodeValue,trim=v.trim();if(resolve(trim))node.nodeValue=v.replace(trim,resolve(trim));}root.querySelectorAll('[aria-label],[placeholder],[alt],[title]').forEach(el=>{for(const attr of ['aria-label','placeholder','alt','title']){let v=el.getAttribute(attr);if(v&&resolve(v))el.setAttribute(attr,resolve(v));}})}
};
