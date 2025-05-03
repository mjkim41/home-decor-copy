package com.decormasters.homedecor.controller.rest;

import com.decormasters.homedecor.domain.member.dto.response.MeResponse;
import com.decormasters.homedecor.exception.authorization.AuthErrorCode;
import com.decormasters.homedecor.exception.authorization.AuthException;
import com.decormasters.homedecor.jwt.JwtProvider;
import com.decormasters.homedecor.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
@Slf4j
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final JwtProvider jwtProvider;

    // 로그인한 유저의 프로필 정보를 갖다주는 API
    @GetMapping("/tk/{token}")
    public ResponseEntity<MeResponse> getCurrentUser(
            @PathVariable("token") String token
    ) {
        String currentLoginUsername = jwtProvider.getCurrentLoginUsername(token);
        MeResponse meResponse = profileService.getLoggedInUser(currentLoginUsername);
        return ResponseEntity.ok().body(meResponse);
    }

    // 로그인한 유저의 프로필 정보 확인
    @GetMapping("/me")
    public ResponseEntity<MeResponse> getLoggedInUserProfile(@AuthenticationPrincipal String userEmail) {

        // 로그인 하지 않은 경우
        if (userEmail.equals("anonymousUser")) {
            return ResponseEntity.ok().body(null);
        }

        // 로그인 한 경우
        MeResponse meResponse = profileService.getLoggedInUser(userEmail);
        return ResponseEntity.ok().body(meResponse);
    }

    // 로그인한 유저의 프로필 정보를 갖다주는 API
    @GetMapping("/{userId}")
    public ResponseEntity<MeResponse> getSelectedUser(
            @PathVariable("userId") String userId
    ) {
        Long id = Long.parseLong(userId);
        MeResponse userData = profileService.findUserById(id);
        return ResponseEntity.ok().body(userData);
    }

}
