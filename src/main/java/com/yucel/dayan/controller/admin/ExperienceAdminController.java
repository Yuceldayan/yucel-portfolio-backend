package com.yucel.dayan.controller.admin;

import com.yucel.dayan.dto.experience.ExperienceDto;
import com.yucel.dayan.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/experiences")
public class ExperienceAdminController {

    private final ExperienceService service;

    public ExperienceAdminController(ExperienceService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceDto>> listAdmin() {
        return ResponseEntity.ok(service.listAdmin());
    }

    @PostMapping
    public ResponseEntity<ExperienceDto> create(@RequestBody ExperienceDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExperienceDto> update(@PathVariable Long id, @RequestBody ExperienceDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
