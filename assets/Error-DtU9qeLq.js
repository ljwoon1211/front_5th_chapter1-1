(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const f=()=>({html:`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}),p=(e={})=>{let n={...e};const a=[],r=()=>({...n}),t=i=>{const l={...n};return n={...n,...i},a.forEach(g=>g(n,l)),n};return{getState:r,setState:t,subscribe:i=>(a.push(i),()=>{const l=a.indexOf(i);l>-1&&a.splice(l,1)}),load:i=>{try{const l=localStorage.getItem(i);l&&t({...JSON.parse(l)})}catch(l){console.error("로컬 스토리지 로드 오류:",l)}},save:i=>{try{localStorage.setItem(i,JSON.stringify(n))}catch(l){console.error("로컬 스토리지 저장 오류:",l)}}}},b={currentUser:null,loggedIn:!1},d=p(b),h=()=>{const e=localStorage.getItem("user");if(e){const n=JSON.parse(e);d.setState({currentUser:n,loggedIn:!0})}},m={login:(e,n="",a="")=>{const r={username:e,email:n,bio:a};return localStorage.setItem("user",JSON.stringify(r)),d.setState({currentUser:r,loggedIn:!0}),r},logout:()=>{localStorage.removeItem("user"),d.setState({currentUser:null,loggedIn:!1})},updateProfile:(e,n,a)=>{const{currentUser:r}=d.getState(),t={...r,username:e,email:n,bio:a};return localStorage.setItem("user",JSON.stringify(t)),d.setState({currentUser:t}),t}};h();const v=()=>({getUser:()=>{const{currentUser:s}=d.getState();return s},loggedIn:()=>{const{loggedIn:s}=d.getState();return s},login:(s,c="",o="")=>m.login(s,c,o),logout:s=>{m.logout(),s&&s.navigateTo&&s.navigateTo("/login")},updateProfile:(s,c,o)=>m.updateProfile(s,c,o)}),u=v(),x=e=>{const n=()=>{const t=u.loggedIn(),s=o=>e.getCurrentPath()===o?"text-blue-600 font-bold nav-link":"text-gray-600 nav-link";return{html:`
      <nav class="bg-white shadow-md p-2 sticky top-14" id="main-nav">
        <ul class="flex justify-around">
          <li><a href="/" class="${s("/")}" id="home-link">홈</a></li>
             ${t?`
        <li><a href="/profile" class="${s("/profile")}" id="profile-link">프로필</a></li>
        <li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`:'<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>'}
        </ul>
      </nav>
    `}},a=()=>{const t=document.getElementById("main-nav");if(!t)return;const s=t.cloneNode(!0);t.parentNode.replaceChild(s,t),s.addEventListener("click",c=>{const o=c.target.closest("a");if(!o||c.defaultPrevented)return;switch(c.preventDefault(),o.id){case"logout":u.logout(e);break;case"login":e.navigateTo("/login");break;default:{const l=o.getAttribute("href");l&&l.startsWith("/")&&e.navigateTo(l);break}}})},r=()=>{a()};return{...n(),mount:r}},y=()=>({html:`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  `}),E=({content:e,router:n})=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${y().html}
      ${x(n).html}
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
`}),w=()=>{const e={},n=(o,i)=>{e[o]=i},a=()=>window.location.pathname,r=o=>{const i=o.startsWith("/")?o:`/${o}`;history.pushState(null,"",i),t()},t=()=>{const o=a();if(["/profile"].includes(o)&&!u.loggedIn()){history.replaceState(null,"","/login"),e["/login"]();return}if(o==="/login"&&u.loggedIn()){history.replaceState(null,"","/"),e["/"]();return}e[o]?e[o]():e["/error"]?e["/error"]():console.log("404 Not Found")};return{addRoute:n,navigateTo:r,handleRoute:t,getCurrentPath:a,init:()=>{t()},setupListeners:()=>{window.addEventListener("popstate",t),document.addEventListener("click",o=>{const i=o.target.closest("a"),l=i==null?void 0:i.getAttribute("href");l!=null&&l.startsWith("/")&&l!=="#"&&(o.preventDefault(),r(l))})}}},S=()=>{const e={},n=(o,i)=>{e[o]=i},a=()=>window.location.hash.replace(/^#/,"")||"/",r=o=>{window.location.hash=o},t=()=>{const o=a();if(["/profile"].includes(o)&&!u.loggedIn()){window.location.hash="/login";return}if(o==="/login"&&u.loggedIn()){window.location.hash="/";return}e[o]?e[o]():e["/error"]?e["/error"]():console.log("404 Not Found")};return{addRoute:n,navigateTo:r,handleRoute:t,getCurrentPath:a,init:()=>{window.location.hash?t():window.location.hash="/"},setupListeners:()=>{window.addEventListener("hashchange",t),document.addEventListener("click",o=>{const i=o.target.closest("a"),l=i==null?void 0:i.getAttribute("href");l!=null&&l.startsWith("/")&&l!=="#"&&(o.preventDefault(),r(l))})}}},P=(e={})=>{const{type:n="browser"}=e;return n==="hash"?S():w()},I=(e,n,a=!0)=>{const r=document.getElementById(n);if(!r)return;const t=e();r.outerHTML=t.html,a&&t.mount&&t.mount()},N=()=>{const e=()=>{const{username:r,email:t,bio:s}=u.getUser()||{username:"홍길동",email:"hong@example.com",bio:"안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다."};return{html:`
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
                  >${s} ${s}</textarea>
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
    `}},n=()=>{const r=document.getElementById("profile-form");r&&r.addEventListener("submit",t=>{t.preventDefault();const s=document.getElementById("username").value,c=document.getElementById("email").value,o=document.getElementById("bio").value;console.log("bio",o),u.updateProfile(s,c,o),alert("프로필이 업데이트되었습니다.")})},a=()=>(n(),d.subscribe(t=>{t.currentUser&&I(e,"profile-container")}));return{...e(),mount:a}},U=e=>({html:`
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
  `,mount:()=>{const a=document.getElementById("login-form");a&&a.addEventListener("submit",r=>{r.preventDefault();const t=document.getElementById("username").value;if(t.trim()===""){alert("사용자 이름을 입력해주세요.");return}m.login(t),e.navigateTo("/")})}}),O=()=>({html:`
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
