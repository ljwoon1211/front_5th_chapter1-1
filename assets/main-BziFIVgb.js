import{c as n,P as r,L as i,E as s,a,N as u,M as d}from"./createRouter-BmqAUHfB.js";const c=()=>{const t=n({type:"browser"}),e=o=>{document.getElementById("root").innerHTML=a({content:o,router:t}),u(t).mount(),o.mount&&o.mount()};return{init:()=>{t.addRoute("/",()=>e(d())),t.addRoute("/profile",()=>e(r())),t.addRoute("/login",()=>{const o=i(t);document.getElementById("root").innerHTML=o.html,o.mount()}),t.addRoute("/error",()=>document.getElementById("root").innerHTML=s()),t.setupListeners(),t.init()}}},m=c();m.init();
