import authService from "../services/authService";
import { userStore } from "../store/userStore";
import { renderComponent } from "../utils/renderUtils";

const createProfile = () => {
  const render = () => {
    const { username, email, bio } = authService.getUser() || {
      username: "홍길동",
      email: "hong@example.com",
      bio: "안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.",
    };

    const html = `
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
                    value="${username}"
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
                    value="${email}"
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
                  >${bio} ${bio}</textarea>
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
    `;

    return {
      html,
    };
  };

  // 이벤트 리스너 설정 함수
  const setupEventListeners = () => {
    const profileForm = document.getElementById("profile-form");

    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const bio = document.getElementById("bio").value;
        console.log("bio", bio);
        // 프로필 업데이트 함수 추가
        authService.updateProfile(username, email, bio);

        alert("프로필이 업데이트되었습니다.");
      });
    }
  };

  const mount = () => {
    setupEventListeners();

    // 상태 변경 구독
    const unsubscribe = userStore.subscribe((newState) => {
      // 프로필 폼 필드 업데이트
      if (newState.currentUser) {
        renderComponent(render, "profile-container");
      }
    });

    // 컴포넌트 언마운트 시 구독 해제를 위한 함수 반환
    return unsubscribe;
  };
  return {
    ...render(),
    mount,
  };
};

export default createProfile;
