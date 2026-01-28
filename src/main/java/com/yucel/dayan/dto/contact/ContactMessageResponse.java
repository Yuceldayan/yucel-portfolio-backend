// src/main/java/com/yucel/dayan/dto/contact/ContactMessageResponse.java
package com.yucel.dayan.dto.contact;

import java.time.LocalDateTime;

public class ContactMessageResponse {
    private Long id;
    private String name;
    private String email;
    private String message;
    private LocalDateTime createdAt;

    public ContactMessageResponse(Long id, String name, String email, String message, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = createdAt;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getMessage() { return message; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
