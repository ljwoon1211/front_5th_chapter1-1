import createStore from "./createStore.js";

// 초기 상태 정의
const initialState = {
  currentUser: null,
  loggedIn: false,
};

const userStore = createStore(initialState);

// 스토어 초기화 - 로컬 스토리지에서 데이터 로드
const initUserStore = () => {
  const userData = localStorage.getItem("user");
  if (userData) {
    const user = JSON.parse(userData);
    userStore.setState({ currentUser: user, loggedIn: true });
  }
};

// 사용자 관련 액션
const userActions = {
  // 로그인
  login: (username, email = "", bio = "") => {
    const userData = { username, email, bio };
    localStorage.setItem("user", JSON.stringify(userData));
    userStore.setState({ currentUser: userData, loggedIn: true });
    return userData;
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("user");
    userStore.setState({ currentUser: null, loggedIn: false });
  },

  // 프로필 업데이트
  updateProfile: (username, email, bio) => {
    const { currentUser } = userStore.getState();
    const updatedUser = { ...currentUser, username, email, bio };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    userStore.setState({ currentUser: updatedUser });
    return updatedUser;
  },
};

// 초기화 실행
initUserStore();

export { userStore, userActions };
