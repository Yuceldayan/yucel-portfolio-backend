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
                // ✅ CorsConfig'teki CorsConfigurationSource bean'ini kullanır
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .logout(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // ✅ Preflight (CORS) istekleri
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ✅ Auth endpointleri açık (login vs.)
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        // ✅ Public endpointler açık
                        .requestMatchers(HttpMethod.GET, "/api/v1/public/**").permitAll()

                        // (Sende ayrıca /api/v1/experiences public ise böyle kalsın)
                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/experiences",
                                "/api/v1/experiences/**"
                        ).permitAll()

                        // ✅ Contact form açık
                        .requestMatchers(HttpMethod.POST, "/api/v1/contact/**").permitAll()

                        // ✅ Admin endpointler: ADMIN role şart
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                        // ✅ Geri kalan her şey giriş ister (güvenli default)
                        .anyRequest().authenticated()
                )

                // ✅ JWT filter
                .addFilterBefore(new JwtAuthFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
