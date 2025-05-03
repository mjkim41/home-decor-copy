package com.decormasters.homedecor.controller.routes;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RouteController {

    // 기준 경로 : application.yml의 spring:mvc:view

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/post/{postId}")
    public String postDetailPage(@PathVariable Long postId) {
        return "components/detail-page";
    }

    // 아래는 React로 migration
//    @GetMapping("/sign-up")
//    public String signUp() {
//        return "auth/signUp";
//    }
//
//    @GetMapping("/login")
//    public String login() {
//        return "auth/login";
//    }


}



