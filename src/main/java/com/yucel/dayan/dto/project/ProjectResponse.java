// src/main/java/com/yucel/dayan/dto/project/ProjectResponse.java
package com.yucel.dayan.dto.project;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectResponse {

    private Long id;
    private String title;

    // Kartta gösterilecek
    private String shortDescription;

    // Modalda gösterilecek
    private String longDescription;

    private String liveUrl;
    private String repoUrl;
    private String coverImageUrl;

    private List<String> features;
    private List<String> technologies;

    private LocalDateTime createdAt;

    // ✅ Admin panel sırası
    private Integer displayOrder;

    public ProjectResponse(
            Long id,
            String title,
            String shortDescription,
            String longDescription,
            String liveUrl,
            String repoUrl,
            String coverImageUrl,
            List<String> features,
            List<String> technologies,
            LocalDateTime createdAt,
            Integer displayOrder
    ) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
        this.longDescription = longDescription;
        this.liveUrl = liveUrl;
        this.repoUrl = repoUrl;
        this.coverImageUrl = coverImageUrl;
        this.features = features;
        this.technologies = technologies;
        this.createdAt = createdAt;
        this.displayOrder = displayOrder;
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }

    public String getShortDescription() { return shortDescription; }
    public String getLongDescription() { return longDescription; }

    public String getLiveUrl() { return liveUrl; }
    public String getRepoUrl() { return repoUrl; }
    public String getCoverImageUrl() { return coverImageUrl; }

    public List<String> getFeatures() { return features; }
    public List<String> getTechnologies() { return technologies; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public Integer getDisplayOrder() { return displayOrder; }
}
