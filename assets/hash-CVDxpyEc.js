(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function r(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(o){if(o.ep)return;o.ep=!0;const e=r(o);fetch(o.href,e)}})();const g=()=>({html:`
    <footer class="bg-gray-200 p-4 text-center">
      <p>&copy; 2024 항해플러스. All rights reserved.</p>
    </footer>
  `}),p=()=>{const t=()=>{const e=localStorage.getItem("user");return e?JSON.parse(e):null};return{getUser:t,loggedIn:()=>localStorage.getItem("user")!==null,login:(e,s="",i="")=>{const c={username:e,email:s,bio:i};return localStorage.setItem("user",JSON.stringify(c)),c},logout:e=>{localStorage.removeItem("user"),e&&e.navigateTo&&e.navigateTo("/login")},updateProfile:(e,s,i)=>{const l={...t(),username:e,email:s,bio:i};return localStorage.setItem("user",JSON.stringify(l)),l}}},d=p(),f=t=>{const n=o=>t.getCurrentPath()===o?"text-blue-600 font-bold nav-link":"text-gray-600 nav-link",r=d.loggedIn();return{html:`
    <nav class="bg-white shadow-md p-2 sticky top-14" id="main-nav">
      <ul class="flex justify-around">
        <li><a href="/" class="${n("/")}" id="home-link">홈</a></li>
           ${r?`
      <li><a href="/profile" class="${n("/profile")}" id="profile-link">프로필</a></li>
      <li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`:'<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>'}
      </ul>
    </nav>
  `,mount:()=>{const o=document.getElementById("main-nav");o&&o.addEventListener("click",e=>{const s=e.target.closest("a");if(!(!s||e.defaultPrevented)){if(s.id==="logout"){e.preventDefault(),d.logout(t);return}if(s.id==="login"){e.preventDefault(),t.navigateTo("/login");return}s.getAttribute("href")&&s.getAttribute("href").startsWith("/")&&(e.preventDefault(),t.navigateTo(s.getAttribute("href")))}})}}},b=()=>({html:`
    <header class="bg-blue-600 text-white p-4 sticky top-0">
      <h1 class="text-2xl font-bold">항해플러스</h1>
    </header>
  `}),h=({content:t,router:n})=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${b().html}
      ${f(n).html}
      ${t.html}
      ${g().html}
    </div>
  </div>
`,v=()=>({html:`
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
  `}),x=t=>({html:`
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
  `,mount:()=>{const r=document.getElementById("login-form");r&&r.addEventListener("submit",a=>{a.preventDefault();const o=document.getElementById("username").value;if(o.trim()===""){alert("사용자 이름을 입력해주세요.");return}d.login(o,"",""),t.navigateTo("/")})}}),y=()=>({html:`
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
`}),w=()=>{const t=d.getUser()||{username:"홍길동",email:"hong@example.com",bio:"안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다."};return{html:`
        <main class="p-4">
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
                  value="${t.username}"
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
                  value="${t.email}"
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
                >${t.bio} ${t.bio}</textarea>
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
  `,mount:()=>{const r=document.getElementById("profile-form");r&&r.addEventListener("submit",a=>{a.preventDefault();const o=document.getElementById("username").value,e=document.getElementById("email").value,s=document.getElementById("bio").value;console.log("bio",s),d.updateProfile(o,e,s),alert("프로필이 업데이트되었습니다.")})}}},I=(t={})=>{const n=t.basename!==void 0?t.basename:"/front_5th_chapter1-1",r={},a=(l,u)=>{r[l]=u},o=()=>window.location.pathname,e=l=>{const u=n+(l.startsWith("/")?l:`/${l}`);history.pushState(null,"",u),s()},s=()=>{const l=o();if(["/profile"].includes(l)&&!d.loggedIn()){history.replaceState(null,"",n+"/login"),r["/login"]();return}if(l==="/login"&&d.loggedIn()){history.replaceState(null,"",n+"/"),r["/"]();return}r[l]?r[l]():r["/error"]?r["/error"]():console.log("404 Not Found")};return{addRoute:a,navigateTo:e,handleRoute:s,getCurrentPath:o,init:()=>{s()},setupListeners:()=>{window.addEventListener("popstate",s),document.addEventListener("click",l=>{const u=l.target.closest("a"),m=u==null?void 0:u.getAttribute("href");m!=null&&m.startsWith("/")&&m!=="#"&&(l.preventDefault(),e(m))})},basename:n}},L=()=>{const t={},n=(i,c)=>{t[i]=c},r=()=>window.location.hash.replace(/^#/,"")||"/",a=i=>{window.location.hash=i},o=()=>{const i=r();if(["/profile"].includes(i)&&!d.loggedIn()){window.location.hash="/login";return}if(i==="/login"&&d.loggedIn()){window.location.hash="/";return}t[i]?t[i]():t["/error"]?t["/error"]():console.log("404 Not Found")};return{addRoute:n,navigateTo:a,handleRoute:o,getCurrentPath:r,init:()=>{window.location.hash?o():window.location.hash="/"},setupListeners:()=>{window.addEventListener("hashchange",o),document.addEventListener("click",i=>{const c=i.target.closest("a"),l=c==null?void 0:c.getAttribute("href");l!=null&&l.startsWith("/")&&l!=="#"&&(i.preventDefault(),a(l))})}}},E=(t={})=>{const{type:n="browser"}=t;return n==="hash"?L():I()},P=()=>{const t=E({type:"hash"}),n=a=>{document.getElementById("root").innerHTML=h({content:a,router:t}),f(t).mount(),a.mount&&a.mount()};return{init:()=>{t.addRoute("/",()=>n(y())),t.addRoute("/profile",()=>n(w())),t.addRoute("/login",()=>{const a=x(t);document.getElementById("root").innerHTML=a.html,a.mount()}),t.addRoute("/error",()=>document.getElementById("root").innerHTML=v().html),t.setupListeners(),t.init()}}},R=P();R.init();
