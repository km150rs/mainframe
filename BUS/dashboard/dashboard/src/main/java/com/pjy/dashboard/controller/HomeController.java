package com.pjy.dashboard.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/")
public class HomeController {

/*
    @GetMapping("/")
    public String homeView() {
        return "thymeleaf/thymeleafHome";
    }


    @GetMapping("/signup")
    public String signupView() {
        return "thymeleaf/thymeleafSignup";
    }
*/

    @PreAuthorize("hasRole('ROLE_MEMBER')")
    @GetMapping("/member/info")
    public String userInfoView() {
        return "thymeleaf/thymeleafUser_info";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/admin")
    public String adminView() {
        return "thymeleaf/thymeleafAdmin";
    }

    @GetMapping("/denied")
    public String deniedView() {
        return "thymeleaf/thymeleafDenied";
    }
}