package com.yucel.dayan.controller.publicapi;

import com.yucel.dayan.dto.about.AboutResponse;
import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.service.AboutService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/public/about")
public class AboutPublicController {

    private final AboutService aboutService;

    public AboutPublicController(AboutService aboutService) {
        this.aboutService = aboutService;
    }

    @GetMapping
    public ApiOk<AboutResponse> get() {
        return ApiOk.ok("about", aboutService.get());
    }
}
