// ============ 로그인 여부를 확인해서,
//              1) 로그인 여부에 따라 로그인 버튼을 로그인/로그아웃 버튼으로 변경
//              2) 로그인 여부에 따라 a 태그를 누를 시에 다음 처리할 내용 변경

import { renderUserProfile } from "./navigation.js";

// 1. 로그인 여부 확인(로그인 한 경우, login.js의 코드에 의하여 localStorage에 코드가 저장됨)
const accessToken = localStorage.getItem("accessToken");
console.log(accessToken);

// 2. 로그인 안했을 경우,
const $pureLoginLink = document.querySelector('nav a.login');

function setDefaultProfileImage() {
    const $user = document.querySelector('.current-user');
    $user.src = "https://image.ohou.se/i/bucketplace-v2-development/uploads/default_images/avatar.png";
    $user.alt = `00의 프로필 이미지`;
}

if (accessToken === null) {
    // 로그인 a 태그에 'logged-out' 클래스 붙임 (logged-out 태그 붙어 있어야 a 태그 누르면 로그인 페이지로 이동)
    $pureLoginLink.classList.add('logged-out');
    $pureLoginLink.classList.remove('logged-in');

    // 태그 내용을 '로그인'으로 변경
    $pureLoginLink.innerHTML = "로그인";

    const $loginLink = document.querySelector('nav a.login.logged-out');
    const $logoutLink = document.querySelector('nav a.login.logged-in');

    // 2-1. 로그인 a 태그(class에 logged-out 있을 때) 누를 경우 :
    //  - a href인 "/login"으로 이동 하는게 아니라(그럴 경우 current 주소 못 가져감)
    //    login-redirect.js에서 a 태그에 저장한 /login?redierct="현재페이지 경로로 이동
    $loginLink.addEventListener('click', async (e) => {
        e.preventDefault();
        window.location.href = $loginLink.href;
    }, { once: true });


// 3. 로그인 했을 경우
} else if (accessToken !== null) {

    // 로그인 a 태그에 'logged-in' 클래스 붙임 (logged-in 클래스 붙어 있어야 a 태그 누르면 로그인 아웃 요청 fetch)
    $pureLoginLink.classList.remove('logged-out');
    $pureLoginLink.classList.add('logged-in');

    // 태그 내용을 '로그아웃'으로 변경
    $pureLoginLink.innerHTML = "로그아웃";

    // 3-1. 로그아웃 a 태그(class에 logged-in 있을 때) 누를 경우 : 로그아웃 백엔드에 요청
    const $logoutLink = document.querySelector('nav a.login.logged-in');
    $logoutLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/logout', {
            method: 'POST'
        });

        if (!response.ok) {
            alert('로그아웃에 실패했습니다.');
            return;
        }


        // 브라우저가 저장한 토큰을 삭제
        localStorage.removeItem('accessToken');

        alert('로그아웃 되었습니다.');

        // 프로필 이미지 사진을 다시 기본세팅으로
        setDefaultProfileImage();

        // 로그아웃 버튼을 로그인 버튼으로 바꿔줌(a 태그 클래스에 따라 a 태그 누를 시 처리 내용이 다르게 구현되어 있음)
        $logoutLink.classList.add('logged-out');
        $logoutLink.classList.remove('logged-in');
        $logoutLink.innerHTML = '로그인';

        // 로그인 버튼 event 생성
        const $loginLink = document.querySelector('nav a.login.logged-out');

        $loginLink.addEventListener('click', async (e) => {
            e.preventDefault();
            window.location.href = $loginLink.href;
        });

    }, { once: true });

}




