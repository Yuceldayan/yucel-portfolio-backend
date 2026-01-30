// src/main/java/com/yucel/dayan/service/impl/ContactServiceImpl.java
package com.yucel.dayan.service.impl;

import com.yucel.dayan.dto.contact.ContactMessageResponse;
import com.yucel.dayan.dto.contact.CreateContactRequest;
import com.yucel.dayan.entity.ContactMessage;
import com.yucel.dayan.repository.ContactMessageRepository;
import com.yucel.dayan.service.ContactService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactMessageRepository repo;

    public ContactServiceImpl(ContactMessageRepository repo) {
        this.repo = repo;
    }

    @Override
    public ContactMessageResponse create(CreateContactRequest req) {
        ContactMessage m = new ContactMessage();
        m.setName(req.getName());
        m.setEmail(req.getEmail());
        m.setSubject(req.getSubject());   // ✅ subject eklendi
        m.setMessage(req.getMessage());

        ContactMessage saved = repo.save(m);
        return toResponse(saved);
    }

    @Override
    public List<ContactMessageResponse> listAll() {
        return repo.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    private ContactMessageResponse toResponse(ContactMessage m) {
        return new ContactMessageResponse(
                m.getId(),
                m.getName(),
                m.getEmail(),
                m.getSubject(),          // ✅ subject eklendi
                m.getMessage(),
                m.getCreatedAt()
        );
    }
}
