import {getCurrentUserProfile} from "../util/auth.js";

// 로그인 했을 경우 사용자 프로필 이미지 설정 함수
function setUserProfileImage(profileImageUrl, nickname) {
    const $user = document.querySelector('.current-user');
    $user.alt = `${nickname}의 프로필 이미지`;
    if (profileImageUrl !== null) {
        // 프로필 이미지 생성
        $user.src = profileImageUrl;
    }
}

// 로그인 하지 않은 경우 사용자 프로필 이미지 설정 함수
function setDefaultProfileImage() {
    const $user = document.querySelector('.current-user');
    $user.src = "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png";
    $user.alt = `00의 프로필 이미지`;
}

// 인덱스 페이지 우측 상단의 유저 프로필 불러오기
async function renderUserProfile() {

    const $user = document.querySelector('.current-user');

    // 인증 로직을 서버에서 일괄 처리하고 클라이언트와 서버 상태 불일치 문제 방지하지 위해,
    // localStorage 여부를 확인하지 않고 바로 fetch

    try {
        // 로그인 정보 가져오는 함수(비로그인 시 200에 null 반환, 실패했을 경우 throw error)
        const userData = await getCurrentUserProfile();

        // 로그인한 경우
        if (userData) {
            console.log(userData);
            const { profileImageUrl, nickname } = userData;
            setUserProfileImage(profileImageUrl, nickname);
        // 로그인 안했을 경우(userData가 null)
        } else {
            setDefaultProfileImage();
        }
    } catch (error) {
        console.error('Failed to fetch current user profile:', error);
        setDefaultProfileImage();
    }
}

async function initNavigation() {
    await renderUserProfile(); // 유저 profile 불러오기
}

export { renderUserProfile, initNavigation };