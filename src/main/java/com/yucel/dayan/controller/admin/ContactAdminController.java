// src/main/java/com/yucel/dayan/controller/admin/ContactAdminController.java
package com.yucel.dayan.controller.admin;

import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.dto.contact.ContactMessageResponse;
import com.yucel.dayan.service.ContactService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
  Admin Contact API:
  - Gelen mesajları admin listeler.
*/
@RestController
@RequestMapping("/api/v1/admin/contacts")
public class ContactAdminController {

    private final ContactService contactService;

    public ContactAdminController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping
    public ApiOk<List<ContactMessageResponse>> listAll() {
        return ApiOk.ok("messages listed", contactService.listAll());
    }
}
