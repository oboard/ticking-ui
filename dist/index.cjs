"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const __vite_glob_0_0=`<column align-items="center" justify-content="center" width="100vw" height="100vh">
    <script>
        window.counter = 0;
    <\/script>
    You have pushed the button this many times:
    <span :content="counter" text-align="center"></span>
    <button width="48px" @click="(e)=>{
          counter++;
          build('span');
        }">
        +
    </button>
</column>`,__vite_glob_0_1=`<column align-items="center" justify-content="center" width="100vw" height="100vh">
    SubPage
</column>`,zenliter=document.getElementById("zenlite"),pages=Object.assign({"./pages/index.zlt":__vite_glob_0_0,"./pages/sub/index.zlt":__vite_glob_0_1});console.log(pages);window.addEventListener("load",async function(t){let n=window.location.pathname;console.log(n),n=="/"&&(n="/index");let a=pages[`./pages${n}.zlt`];a||(n+=n.endsWith("/")?"index":"/index",a=pages[`./pages${n}.zlt`]),zenliter&&(zenliter.innerHTML=a,build(zenliter))});function htmlDecode(t){return String(t).replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&#47;/g,"/").replace(/&#40;/g,"(").replace(/&#41;/g,")").replace(/&#123;/g,"{").replace(/&#125;/g,"}").replace(/&#91;/g,"[").replace(/&#93;/g,"]").replace(/&#35;/g,"#").replace(/&#37;/g,"%").replace(/&#59;/g,";").replace(/&#43;/g,"+").replace(/&#45;/g,"-").replace(/&#42;/g,"*").replace(/&#64;/g,"@").replace(/&#36;/g,"$").replace(/&#95;/g,"_")}function build(parent){if(typeof parent=="string"&&(parent=document.querySelector(parent)),parent.tagName=="SCRIPT"){eval(parent.innerHTML);return}const attributes=parent.attributes,attributesMap={};for(const t of attributes)attributesMap[t.name]=t.value;for(const attribute of attributes)if(attribute.name.startsWith(":")){const name=attribute.name.slice(1);let value="";try{function width(){return window.innerWidth}function height(){return window.innerHeight}value=eval(htmlDecode(attribute.value))}catch(t){console.log(t)}attributesMap[name]=value,parent.setAttribute(name,value)}else if(attribute.name.startsWith("@")){attribute.name=="@click"&&parent.style.setProperty("cursor","pointer");const name=attribute.name.slice(1),value=attribute.value;parent.addEventListener(name,e=>{try{eval(value)(e)}catch(t){console.log(t)}}),parent.removeAttribute(attribute.name)}if(attributesMap.if==!1){parent.style.setProperty("display","none");return}for(const t of attributes){switch(t.name){case"content":parent.innerHTML=t.value;break}attributesMap[t.name]=t.value,parent.style.setProperty(t.name,t.value)}const children=parent.children;for(const t of children)build(t)}exports.build=build;
