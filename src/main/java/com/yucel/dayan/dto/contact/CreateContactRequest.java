// src/main/java/com/yucel/dayan/dto/contact/CreateContactRequest.java
package com.yucel.dayan.dto.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/*
  Contact form request:
  - Public endpoint /api/v1/contact ile gelecek.
*/
public class CreateContactRequest {

    @NotBlank(message = "name boş olamaz")
    @Size(max = 120, message = "name en fazla 120 karakter olmalı")
    private String name;

    @NotBlank(message = "email boş olamaz")
    @Email(message = "email formatı geçersiz")
    @Size(max = 180, message = "email en fazla 180 karakter olmalı")
    private String email;

    @NotBlank(message = "message boş olamaz")
    private String message;

    // getter/setter
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
