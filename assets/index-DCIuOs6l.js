(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(e){if(e.ep)return;e.ep=!0;const l=s(e);fetch(e.href,l)}})();const p=()=>`
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`,f=()=>`
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
`,d={getUser:()=>{const t=localStorage.getItem("user");return t?JSON.parse(t):null},loggedIn:()=>localStorage.getItem("user")!==null,login:(t,o="",s="")=>{const n={username:t,email:o,bio:s};return localStorage.setItem("user",JSON.stringify(n)),n},logout:t=>{localStorage.removeItem("user"),t&&t.navigateTo&&t.navigateTo("/login")},updateProfile:(t,o,s)=>{const e={...d.getUser(),username:t,email:o,bio:s};return localStorage.setItem("user",JSON.stringify(e)),e}},g=t=>{const o=e=>t.getCurrentPath()===e?"text-blue-600 font-bold nav-link":"text-gray-600 nav-link",s=d.loggedIn();return{html:`
    <nav class="bg-white shadow-md p-2 sticky top-14">
      <ul class="flex justify-around">
        <li><a href="/" class="${o("/")}" id="home-link">홈</a></li>
           ${s?`
      <li><a href="/profile" class="${o("/profile")}" id="profile-link">프로필</a></li>
      <li><a href="#" class="text-gray-600" id="logout">로그아웃</a></li>`:'<li><a href="/login" class="text-gray-600" id="login">로그인</a></li>'}
      </ul>
    </nav>
  `,mount:()=>{const e=document.getElementById("logout");e&&e.addEventListener("click",l=>{l.preventDefault(),d.logout(t)})}}},b=({content:t,router:o})=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full ">
      ${f()}
      ${g(o).html}
      ${t.html}
      ${p()}
    </div>
  </div>
`,h=()=>`
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
`,v=t=>({html:`
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
  `,mount:()=>{const s=document.getElementById("login-form");s&&s.addEventListener("submit",n=>{n.preventDefault();const e=document.getElementById("username").value;if(e.trim()===""){alert("사용자 이름을 입력해주세요.");return}d.login(e,"",""),t.navigateTo("/")})}}),x=()=>({html:`
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
`}),y=()=>{const t=d.getUser()||{username:"홍길동",email:"hong@example.com",bio:"안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다."};return{html:`
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
                type="submit"S
                class="w-full bg-blue-600 text-white p-2 rounded font-bold"
              >
                프로필 업데이트
              </button>
            </form>
          </div>
        </main>
  `,mount:()=>{const s=document.getElementById("profile-form");s&&s.addEventListener("submit",n=>{n.preventDefault();const e=document.getElementById("username").value,l=document.getElementById("email").value,a=document.getElementById("bio").value;console.log("bio",a),d.updateProfile(e,l,a),alert("프로필이 업데이트되었습니다.")})}}},w=(t={})=>{const o=t.basename!==void 0?t.basename:"/front_5th_chapter1-1",s={},n=(r,c)=>{s[r]=c},e=()=>window.location.pathname,l=r=>{const c=o+(r.startsWith("/")?r:`/${r}`);history.pushState(null,"",c),a()},a=()=>{const r=e();if(["/profile"].includes(r)&&!d.loggedIn()){history.replaceState(null,"",o+"/login"),s["/login"]();return}if(r==="/login"&&d.loggedIn()){history.replaceState(null,"",o+"/"),s["/"]();return}s[r]?s[r]():s["/error"]?s["/error"]():console.log("404 Not Found")};return{addRoute:n,navigateTo:l,handleRoute:a,getCurrentPath:e,init:()=>{a()},setupListeners:()=>{window.addEventListener("popstate",a),document.addEventListener("click",r=>{const c=r.target.closest("a"),m=c==null?void 0:c.getAttribute("href");m!=null&&m.startsWith("/")&&m!=="#"&&(r.preventDefault(),l(m))})},basename:o}},I=()=>{const t={},o=(i,u)=>{t[i]=u},s=()=>window.location.hash.replace(/^#/,"")||"/",n=i=>{window.location.hash=i},e=()=>{const i=s();if(["/profile"].includes(i)&&!d.loggedIn()){window.location.hash="/login";return}if(i==="/login"&&d.loggedIn()){window.location.hash="/";return}t[i]?t[i]():t["/error"]?t["/error"]():console.log("404 Not Found")};return{addRoute:o,navigateTo:n,handleRoute:e,getCurrentPath:s,init:()=>{window.location.hash?e():window.location.hash="/"},setupListeners:()=>{window.addEventListener("hashchange",e),document.addEventListener("click",i=>{const u=i.target.closest("a"),r=u==null?void 0:u.getAttribute("href");r!=null&&r.startsWith("/")&&r!=="#"&&(i.preventDefault(),n(r))})}}},L=(t={})=>{const{type:o="browser"}=t;return console.log(o),o==="hash"?I():w()},E=()=>{const t=L({type:"browser"}),o=n=>{document.getElementById("root").innerHTML=b({content:n,router:t}),g(t).mount(),n.mount&&n.mount()};return{init:()=>{t.addRoute("/",()=>o(x())),t.addRoute("/profile",()=>o(y())),t.addRoute("/login",()=>{const n=v(t);document.getElementById("root").innerHTML=n.html,n.mount()}),t.addRoute("/error",()=>document.getElementById("root").innerHTML=h()),t.setupListeners(),t.init()}}},R=E();R.init();
