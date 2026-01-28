// src/main/java/com/yucel/dayan/service/ProjectService.java
package com.yucel.dayan.service;

import com.yucel.dayan.dto.project.CreateProjectRequest;
import com.yucel.dayan.dto.project.ProjectResponse;
import com.yucel.dayan.dto.project.UpdateProjectRequest;

import java.util.List;

public interface ProjectService {
    List<ProjectResponse> getAll();
    ProjectResponse getById(Long id);
    ProjectResponse create(CreateProjectRequest req);
    ProjectResponse update(Long id, UpdateProjectRequest req);
    void delete(Long id);
}
