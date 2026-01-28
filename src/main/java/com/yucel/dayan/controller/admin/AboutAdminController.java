package com.yucel.dayan.controller.admin;

import com.yucel.dayan.dto.about.AboutResponse;
import com.yucel.dayan.dto.about.UpdateAboutRequest;
import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.service.AboutService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/about")
public class AboutAdminController {

    private final AboutService aboutService;

    public AboutAdminController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    @GetMapping
    public ApiOk<AboutResponse> get() {
        return ApiOk.ok("about", aboutService.get());
    }

    @PutMapping
    public ApiOk<AboutResponse> update(@RequestBody UpdateAboutRequest req) {
        return ApiOk.ok("about updated", aboutService.update(req));
    }
}
