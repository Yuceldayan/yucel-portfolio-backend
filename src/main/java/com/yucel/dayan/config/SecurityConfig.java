package com.yucel.dayan.config;

import com.yucel.dayan.security.JwtAuthFilter;
import com.yucel.dayan.security.JwtService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, JwtService jwtService) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ auth endpointleri açık
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // ✅ public endpointler
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/public/**",
                                "/api/v1/experiences",
                                "/api/v1/experiences/**"
                        ).permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/v1/contact/**").permitAll()

                        // ✅ admin endpointler: ADMIN role şart
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                        .anyRequest().permitAll()
                )

                // ✅ JWT filter
                .addFilterBefore(new JwtAuthFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
