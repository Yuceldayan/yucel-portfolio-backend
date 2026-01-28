// src/main/java/com/yucel/dayan/controller/publicapi/ProjectPublicController.java
package com.yucel.dayan.controller.publicapi;

import com.yucel.dayan.dto.common.ApiOk;
import com.yucel.dayan.dto.project.ProjectResponse;
import com.yucel.dayan.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
  Public Projects API
  ------------------
  Ziyaretçilerin projeleri görüntüleyebilmesi için kullanılır.
  Base URL: /api/v1/public/projects
*/
@RestController
@RequestMapping("/api/v1/public/projects")
public class ProjectPublicController {

    private final ProjectService projectService;

    public ProjectPublicController(ProjectService projectService) {
        this.projectService = projectService;
    }

    /*
      Tüm projeleri getirir
      GET /api/v1/public/projects
    */
    @GetMapping
    public ApiOk<List<ProjectResponse>> getAllProjects() {
        return ApiOk.ok("projects listed", projectService.getAll());
    }

    /*
      Tek proje detayı getirir
      GET /api/v1/public/projects/{id}
    */
    @GetMapping("/{id}")
    public ApiOk<ProjectResponse> getProjectById(@PathVariable Long id) {
        return ApiOk.ok("project detail", projectService.getById(id));
    }
}
