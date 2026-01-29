package com.yucel.dayan.controller;

import com.yucel.dayan.security.AuthCookie;
import com.yucel.dayan.security.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final JwtService jwtService;

    // admin hesabı (properties/env'den)
    private final String adminUser;
    private final String adminPass;

    // ✅ Prod ortamında cookie Secure=true olmalı (SameSite=None için şart)
    private final boolean cookieSecure;

    public AuthController(
            JwtService jwtService,
            @Value("${spring.security.user.name:admin}") String adminUser,
            @Value("${spring.security.user.password:admin123}") String adminPass,
            @Value("${spring.profiles.active:}") String activeProfile
    ) {
        this.jwtService = jwtService;
        this.adminUser = adminUser;
        this.adminPass = adminPass;

        // Render/Vercel prod: HTTPS -> Secure=true
        // Local dev: Secure=false (http://localhost)
        String p = (activeProfile == null) ? "" : activeProfile.toLowerCase();
        this.cookieSecure = p.contains("prod");
    }

    public record LoginReq(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req) {

        if (req == null || req.username() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Eksik bilgi"));
        }

        if (!adminUser.equals(req.username()) || !adminPass.equals(req.password())) {
            return ResponseEntity.status(401).body(Map.of("message", "Kullanıcı adı veya şifre yanlış"));
        }

        String jwt = jwtService.createToken(req.username(), "ADMIN");

        var cookie = AuthCookie.buildAuthCookie(jwt, cookieSecure);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("ok", true, "role", "ADMIN"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        var cookie = AuthCookie.clearAuthCookie(cookieSecure);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("ok", true));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("ok", false));
        }
        return ResponseEntity.ok(Map.of(
                "ok", true,
                "username", auth.getName(),
                "authorities", auth.getAuthorities()
        ));
    }
}
