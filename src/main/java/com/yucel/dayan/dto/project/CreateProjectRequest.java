package com.yucel.dayan.dto.project;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

public class CreateProjectRequest {

    @NotBlank(message = "title boş olamaz")
    @Size(max = 160, message = "title en fazla 160 karakter olmalı")
    private String title;

    // Kart açıklaması (✅ SINIR KALDIRILDI)
    @NotBlank(message = "shortDescription boş olamaz")
    private String shortDescription;

    // Modal açıklaması
    @NotBlank(message = "longDescription boş olamaz")
    private String longDescription;

    @Size(max = 500, message = "liveUrl en fazla 500 karakter olmalı")
    private String liveUrl;

    @Size(max = 500, message = "repoUrl en fazla 500 karakter olmalı")
    private String repoUrl;

    @Size(max = 500, message = "coverImageUrl en fazla 500 karakter olmalı")
    private String coverImageUrl;

    // ✅ Sıra numarası (admin panel)
    private Integer displayOrder;

    // İsteğe bağlı listeler
    private List<@Size(max = 300, message = "feature en fazla 300 karakter olmalı") String> features;

    private List<@Size(max = 120, message = "technology en fazla 120 karakter olmalı") String> technologies;

    // ===== GETTER / SETTER =====

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getLongDescription() { return longDescription; }
    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getRepoUrl() { return repoUrl; }
    public void setRepoUrl(String repoUrl) { this.repoUrl = repoUrl; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) {
        this.coverImageUrl = coverImageUrl;
    }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) {
        this.technologies = technologies;
    }
}
