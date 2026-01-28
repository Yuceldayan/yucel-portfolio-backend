// src/main/java/com/yucel/dayan/controller/publicapi/ContactPublicController.java
package com.yucel.dayan.controller.publicapi;

import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.dto.contact.ContactMessageResponse;
import com.yucel.dayan.dto.contact.CreateContactRequest;
import com.yucel.dayan.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

/*
  Public Contact API:
  - React contact form buraya POST atacak.
*/
@RestController
@RequestMapping("/api/v1/public/contact")
public class ContactPublicController {

    private final ContactService contactService;

    public ContactPublicController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ApiOk<ContactMessageResponse> create(@Valid @RequestBody CreateContactRequest req) {
        return ApiOk.ok("message received", contactService.create(req));
    }
}
