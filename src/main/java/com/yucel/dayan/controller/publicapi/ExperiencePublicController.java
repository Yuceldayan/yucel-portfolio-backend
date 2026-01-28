package com.yucel.dayan.controller.publicapi;

import com.yucel.dayan.dto.experience.ExperienceDto;
import com.yucel.dayan.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ExperiencePublicController {

    private final ExperienceService service;

    public ExperiencePublicController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceDto>> listPublic() {
        return ResponseEntity.ok(service.listPublic());
    }
}
