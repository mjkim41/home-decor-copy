import { fetchWithAuth } from "./api.js";

// 현재 로그인한 사용자 정보를 요청하기
export async function getCurrentUserProfile() {

    const response = await fetchWithAuth(`/api/profiles/me`);

    // 정보 불러오기 실패했을 때
    if (!response.ok) {
        throw new Error('Failed to fetch current user profile');
    }

    // 로그인 유저 정보 불러왔을 때
    return await response.json();
}