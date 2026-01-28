package com.yucel.dayan.controller;

import com.yucel.dayan.security.AuthCookie;
import com.yucel.dayan.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
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

    // admin hesabı (şimdilik properties’ten; sonra DB’ye taşırız)
    private final String adminUser;
    private final String adminPass;

    public AuthController(
            JwtService jwtService,
            @Value("${spring.security.user.name:admin}") String adminUser,
            @Value("${spring.security.user.password:admin123}") String adminPass
    ) {
        this.jwtService = jwtService;
        this.adminUser = adminUser;
        this.adminPass = adminPass;
    }

    public record LoginReq(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req,
                                   @Value("${server.ssl.enabled:false}") boolean sslEnabled) {

        if (req == null || req.username() == null || req.password() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Eksik bilgi"));
        }

        if (!adminUser.equals(req.username()) || !adminPass.equals(req.password())) {
            return ResponseEntity.status(401).body(Map.of("message", "Kullanıcı adı veya şifre yanlış"));
        }

        String jwt = jwtService.createToken(req.username(), "ADMIN");

        var cookie = AuthCookie.buildAuthCookie(jwt, sslEnabled);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(Map.of("ok", true, "role", "ADMIN"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Value("${server.ssl.enabled:false}") boolean sslEnabled) {
        var cookie = AuthCookie.clearAuthCookie(sslEnabled);
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
