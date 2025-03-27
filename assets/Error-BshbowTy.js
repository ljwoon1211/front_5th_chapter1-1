(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const f=()=>({html:`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}),p=(e={})=>{let s={...e};const i=[],r=()=>({...s}),t=n=>{const l={...s};return s={...s,...n},i.forEach(m=>m(s,l)),s};return{getState:r,setState:t,subscribe:n=>(i.push(n),()=>{const l=i.indexOf(n);l>-1&&i.splice(l,1)}),load:n=>{try{const l=localStorage.getItem(n);l&&t({...JSON.parse(l)})}catch(l){console.error("로컬 스토리지 로드 오류:",l)}},save:n=>{try{localStorage.setItem(n,JSON.stringify(s))}catch(l){console.error("로컬 스토리지 저장 오류:",l)}}}},b={currentUser:null,loggedIn:!1},d=p(b),h=()=>{const e=localStorage.getItem("user");if(e){const s=JSON.parse(e);d.setState({currentUser:s,loggedIn:!0})}},g={login:(e,s="",i="")=>{const r={username:e,email:s,bio:i};return localStorage.setItem("user",JSON.stringify(r)),d.setState({currentUser:r,loggedIn:!0}),r},logout:()=>{localStorage.removeItem("user"),d.setState({currentUser:null,loggedIn:!1})},updateProfile:(e,s,i)=>{const{currentUser:r}=d.getState(),t={...r,username:e,email:s,bio:i};return localStorage.setItem("user",JSON.stringify(t)),d.setState({currentUser:t}),t}};h();const v=()=>({getUser:()=>{const{currentUser:o}=d.getState();return o},loggedIn:()=>{const{loggedIn:o}=d.getState();return o},login:(o,c="",a="")=>g.login(o,c,a),logout:o=>{g.logout(),o&&o.navigateTo&&o.navigateTo("/login")},updateProfile:(o,c,a)=>g.updateProfile(o,c,a)}),u=v(),x=e=>{const s=()=>{const t=u.loggedIn(),o=a=>e.getCurrentPath()===a?"text-blue-600 font-bold nav-link":"text-gray-600 nav-link";return{html:`
      <nav class="bg-white shadow-md p-2 sticky top-14" id="main-nav">
        <ul class="flex justify-around">
          <li><a href="/" class="${o("/")}" id="home-link">홈</a></li>
             ${t?`
        <li><a href="/profile" class="${o("/profile")}" id="profile-link">프로필</a></li>
        <li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`:'<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>'}
        </ul>
      </nav>
    `}},i=()=>{const t=document.getElementById("main-nav");if(!t)return;const o=t.cloneNode(!0);t.parentNode.replaceChild(o,t),o.addEventListener("click",c=>{const a=c.target.closest("a");if(!a||c.defaultPrevented)return;switch(c.preventDefault(),a.id){case"logout":u.logout(e);break;case"login":e.navigateTo("/login");break;default:{const l=a.getAttribute("href");l&&l.startsWith("/")&&e.navigateTo(l);break}}})},r=()=>{i()};return{...s(),mount:r}},y=()=>({html:`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  `}),E=({content:e,router:s})=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${y().html}
      ${x(s).html}
      ${e.html}
      ${f().html}
    </div>
  </div>
`,L=()=>({html:`
    <main class="p-4">
      <div class="mb-4 bg-white rounded-lg shadow p-4">
        <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
        <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
      </div>

      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-2">
            <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
            <div>
              <p class="font-bold">홍길동</p>
              <p class="text-sm text-gray-500">5분 전</p>
            </div>
          </div>
          <p>오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!</p>
          <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-2">
            <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
            <div>
              <p class="font-bold">김철수</p>
              <p class="text-sm text-gray-500">15분 전</p>
            </div>
          </div>
          <p>새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!</p>
          <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center mb-2">
            <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
            <div>
              <p class="font-bold">이영희</p>
              <p class="text-sm text-gray-500">30분 전</p>
            </div>
          </div>
          <p>오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?</p>
          <div class="mt-2 flex justify-between text-gray-500">
            <button>좋아요</button>
            <button>댓글</button>
            <button>공유</button>
          </div>
        </div>
      </div>
    </main>
`}),w=()=>{const e="/front_5th_chapter1-1",s={},i=(n,l)=>{s[n]=l},r=()=>window.location.pathname,t=n=>{const l=e+(n.startsWith("/")?n:`/${n}`);history.pushState(null,"",l),o()},o=()=>{const n=r();if(["/profile"].includes(n)&&!u.loggedIn()){history.replaceState(null,"",e+"/login"),s["/login"]();return}if(n==="/login"&&u.loggedIn()){history.replaceState(null,"",e+"/"),s["/"]();return}s[n]?s[n]():s["/error"]?s["/error"]():console.log("404 Not Found")};return{addRoute:i,navigateTo:t,handleRoute:o,getCurrentPath:r,init:()=>{o()},setupListeners:()=>{window.addEventListener("popstate",o),document.addEventListener("click",n=>{const l=n.target.closest("a"),m=l==null?void 0:l.getAttribute("href");m!=null&&m.startsWith("/")&&m!=="#"&&(n.preventDefault(),t(m))})},basename:e}},S=()=>{const e={},s=(a,n)=>{e[a]=n},i=()=>window.location.hash.replace(/^#/,"")||"/",r=a=>{window.location.hash=a},t=()=>{const a=i();if(["/profile"].includes(a)&&!u.loggedIn()){window.location.hash="/login";return}if(a==="/login"&&u.loggedIn()){window.location.hash="/";return}e[a]?e[a]():e["/error"]?e["/error"]():console.log("404 Not Found")};return{addRoute:s,navigateTo:r,handleRoute:t,getCurrentPath:i,init:()=>{window.location.hash?t():window.location.hash="/"},setupListeners:()=>{window.addEventListener("hashchange",t),document.addEventListener("click",a=>{const n=a.target.closest("a"),l=n==null?void 0:n.getAttribute("href");l!=null&&l.startsWith("/")&&l!=="#"&&(a.preventDefault(),r(l))})}}},P=(e={})=>{const{type:s="browser"}=e;return s==="hash"?S():w()},I=(e,s,i=!0)=>{const r=document.getElementById(s);if(!r)return;const t=e();r.outerHTML=t.html,i&&t.mount&&t.mount()},N=()=>{const e=()=>{const{username:r,email:t,bio:o}=u.getUser()||{username:"홍길동",email:"hong@example.com",bio:"안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다."};return{html:`
          <main class="p-4" id="profile-container">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value="${r}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="${t}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${o} ${o}</textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>
    `}},s=()=>{const r=document.getElementById("profile-form");r&&r.addEventListener("submit",t=>{t.preventDefault();const o=document.getElementById("username").value,c=document.getElementById("email").value,a=document.getElementById("bio").value;console.log("bio",a),u.updateProfile(o,c,a),alert("프로필이 업데이트되었습니다.")})},i=()=>(s(),d.subscribe(t=>{t.currentUser&&I(e,"profile-container")}));return{...e(),mount:i}},U=e=>({html:`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
        <form id="login-form">
          <div class="mb-4">
            <input type="text" id="username" placeholder="사용자 이름" class="w-full p-2 border rounded" required>
          </div>
          <div class="mb-6">
            <input type="password" id="password" placeholder="비밀번호" class="w-full p-2 border rounded">
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
        </div>
        <hr class="my-6">
        <div class="text-center">
          <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
        </div>
      </div>
    </main>
  `,mount:()=>{const i=document.getElementById("login-form");i&&i.addEventListener("submit",r=>{r.preventDefault();const t=document.getElementById("username").value;if(t.trim()===""){alert("사용자 이름을 입력해주세요.");return}g.login(t),e.navigateTo("/")})}}),O=()=>({html:`
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
        <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
        <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
        <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <p class="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
          홈으로 돌아가기
        </a>
      </div>
    </main>
  `});export{U as L,N as a,O as b,P as c,E as d,x as e,L as f};
