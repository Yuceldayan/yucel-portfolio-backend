package com.yucel.dayan.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CreateContactRequest {

    @NotBlank(message = "name boş olamaz")
    @Size(max = 120, message = "name en fazla 120 karakter olmalı")
    private String name;

    @NotBlank(message = "email boş olamaz")
    @Email(message = "email formatı geçersiz")
    @Size(max = 180, message = "email en fazla 180 karakter olmalı")
    private String email;

    @NotBlank(message = "subject boş olamaz")
    @Size(max = 200, message = "subject en fazla 200 karakter olmalı")
    private String subject;

    @NotBlank(message = "message boş olamaz")
    private String message;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
