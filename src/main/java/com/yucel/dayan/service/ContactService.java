// src/main/java/com/yucel/dayan/service/ContactService.java
package com.yucel.dayan.service;

import com.yucel.dayan.dto.contact.ContactMessageResponse;
import com.yucel.dayan.dto.contact.CreateContactRequest;

import java.util.List;

public interface ContactService {
    ContactMessageResponse create(CreateContactRequest req);
    List<ContactMessageResponse> listAll(); // admin için
}
