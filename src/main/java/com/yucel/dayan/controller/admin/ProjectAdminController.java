// src/main/java/com/yucel/dayan/controller/admin/ProjectAdminController.java
package com.yucel.dayan.controller.admin;

import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.dto.project.CreateProjectRequest;
import com.yucel.dayan.dto.project.ProjectResponse;
import com.yucel.dayan.dto.project.UpdateProjectRequest;
import com.yucel.dayan.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/projects")
public class ProjectAdminController {

    private final ProjectService projectService;

    public ProjectAdminController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // ✅ LIST: GET /api/v1/admin/projects
    @GetMapping
    public ApiOk<List<ProjectResponse>> getAllProjects() {
        return ApiOk.ok("projects", projectService.getAll());
    }

    // ✅ GET ONE: GET /api/v1/admin/projects/{id}
    @GetMapping("/{id}")
    public ApiOk<ProjectResponse> getProjectById(@PathVariable Long id) {
        return ApiOk.ok("project", projectService.getById(id));
    }

    // ✅ CREATE: POST /api/v1/admin/projects
    @PostMapping
    public ApiOk<ProjectResponse> createProject(@Valid @RequestBody CreateProjectRequest req) {
        return ApiOk.ok("project created", projectService.create(req));
    }

    // ✅ UPDATE: PUT /api/v1/admin/projects/{id}
    @PutMapping("/{id}")
    public ApiOk<ProjectResponse> updateProject(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProjectRequest req
    ) {
        return ApiOk.ok("project updated", projectService.update(id, req));
    }

    // ✅ DELETE: DELETE /api/v1/admin/projects/{id}
    @DeleteMapping("/{id}")
    public ApiOk<Void> deleteProject(@PathVariable Long id) {
        projectService.delete(id);
        return ApiOk.ok("project deleted");
    }
}
