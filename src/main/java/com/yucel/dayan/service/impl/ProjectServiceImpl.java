// src/main/java/com/yucel/dayan/service/impl/ProjectServiceImpl.java
package com.yucel.dayan.service.impl;

import com.yucel.dayan.dto.project.CreateProjectRequest;
import com.yucel.dayan.dto.project.ProjectResponse;
import com.yucel.dayan.dto.project.UpdateProjectRequest;
import com.yucel.dayan.entity.Project;
import com.yucel.dayan.exception.ApiException;
import com.yucel.dayan.repository.ProjectRepository;
import com.yucel.dayan.service.ProjectService;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // ======================
    // PUBLIC
    // ======================

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAll() {
        List<Project> projects = projectRepository.findAllByOrderByDisplayOrderAsc();

        // ✅ open-in-view=false + LAZY listeler -> transaction içinde initialize et
        projects.forEach(p -> {
            Hibernate.initialize(p.getFeatures());
            Hibernate.initialize(p.getTechnologies());
        });

        return projects.stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "Project not found: " + id));

        Hibernate.initialize(project.getFeatures());
        Hibernate.initialize(project.getTechnologies());

        return toResponse(project);
    }

    // ======================
    // ADMIN
    // ======================

    @Override
    @Transactional
    public ProjectResponse create(CreateProjectRequest req) {
        Project p = new Project();

        p.setTitle(safeTrim(req.getTitle()));
        p.setShortDescription(safeTrim(req.getShortDescription()));
        p.setLongDescription(safeTrim(req.getLongDescription()));
        p.setLiveUrl(safeTrim(req.getLiveUrl()));
        p.setRepoUrl(safeTrim(req.getRepoUrl()));
        p.setCoverImageUrl(safeTrim(req.getCoverImageUrl()));

        p.setDisplayOrder(req.getDisplayOrder() == null ? 0 : req.getDisplayOrder());

        p.setFeatures(req.getFeatures() == null ? new ArrayList<>() : new ArrayList<>(req.getFeatures()));
        p.setTechnologies(req.getTechnologies() == null ? new ArrayList<>() : new ArrayList<>(req.getTechnologies()));

        if (p.getTitle() == null || p.getTitle().isBlank()) {
            throw new ApiException(400, "Title is required");
        }

        Project saved = projectRepository.save(p);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public ProjectResponse update(Long id, UpdateProjectRequest req) {
        Project p = projectRepository.findById(id)
                .orElseThrow(() -> new ApiException(404, "Project not found: " + id));

        if (req.getTitle() != null) p.setTitle(safeTrim(req.getTitle()));
        if (req.getShortDescription() != null) p.setShortDescription(safeTrim(req.getShortDescription()));
        if (req.getLongDescription() != null) p.setLongDescription(safeTrim(req.getLongDescription()));
        if (req.getLiveUrl() != null) p.setLiveUrl(safeTrim(req.getLiveUrl()));
        if (req.getRepoUrl() != null) p.setRepoUrl(safeTrim(req.getRepoUrl()));
        if (req.getCoverImageUrl() != null) p.setCoverImageUrl(safeTrim(req.getCoverImageUrl()));

        if (req.getDisplayOrder() != null) p.setDisplayOrder(req.getDisplayOrder());

        if (req.getFeatures() != null) p.setFeatures(new ArrayList<>(req.getFeatures()));
        if (req.getTechnologies() != null) p.setTechnologies(new ArrayList<>(req.getTechnologies()));

        if (p.getTitle() == null || p.getTitle().isBlank()) {
            throw new ApiException(400, "Title is required");
        }

        Project saved = projectRepository.save(p);
        return toResponse(saved);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ApiException(404, "Project not found: " + id);
        }
        projectRepository.deleteById(id);
    }

    // ======================
    // ENTITY -> DTO MAPPER
    // ======================

    private ProjectResponse toResponse(Project p) {
        List<String> features = (p.getFeatures() == null) ? List.of() : List.copyOf(p.getFeatures());
        List<String> technologies = (p.getTechnologies() == null) ? List.of() : List.copyOf(p.getTechnologies());

        return new ProjectResponse(
                p.getId(),
                p.getTitle(),
                p.getShortDescription(),
                p.getLongDescription(),
                p.getLiveUrl(),
                p.getRepoUrl(),
                p.getCoverImageUrl(),
                features,
                technologies,
                p.getCreatedAt(),
                p.getDisplayOrder()
        );
    }

    private String safeTrim(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }
}
