// src/main/java/com/yucel/dayan/entity/ContactMessage.java
package com.yucel.dayan.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/*
  ContactMessage:
  - DB'de "contact_messages" tablosu.
  - İletişim formundan gelen mesajları tutar.
*/
@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = false, length = 120)
    private String name;

    @Column(name="email", nullable = false, length = 180)
    private String email;

    @Column(name="message", nullable = false, columnDefinition = "text")
    private String message;

    @Column(name="created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    // getter/setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
