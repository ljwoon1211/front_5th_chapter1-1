import authService from "../services/authService";

const Profile = () => {
  const userData = authService.getUser() || {
    username: "홍길동",
    email: "hong@example.com",
    bio: "안녕하세요, 항해플러스에서 열심히 공부하고 있는 홍길동입니다.",
  };

  const html = `
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
                  value="${userData.username}"
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
                  value="${userData.email}"
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
                >${userData.bio} ${userData.bio}</textarea>
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
  `;
  return {
    html,
    mount: () => {
      // 프로필 업데이트 이벤트 핸들러
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
    },
  };
};

export default Profile;
