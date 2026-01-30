package com.yucel.dayan.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 160)
    private String title;

    // Kart üstü kısa açıklama (✅ Sınır yok: TEXT)
    @Column(name = "short_description", nullable = false, columnDefinition = "text")
    private String shortDescription;

    // Modal içi uzun açıklama
    @Column(name = "long_description", nullable = false, columnDefinition = "text")
    private String longDescription;

    // ✅ DB'de NOT NULL olan kolon: description
    // (loglarda bu alan yüzünden patlıyordun)
    @Column(name = "description", nullable = false, columnDefinition = "text")
    private String description;

    @Column(name = "live_url", length = 500)
    private String liveUrl;

    @Column(name = "repo_url", length = 500)
    private String repoUrl;

    @Column(name = "cover_image_url", length = 500)
    private String coverImageUrl;

    // ✅ Admin panelden ayarlanacak sıralama alanı
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 0;

    // ✅ Features listesi (ayrı tabloda tutulur)
    @ElementCollection
    @CollectionTable(
            name = "project_features",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @Column(name = "feature", nullable = false, length = 300)
    private List<String> features = new ArrayList<>();

    // ✅ Technologies listesi (ayrı tabloda tutulur)
    @ElementCollection
    @CollectionTable(
            name = "project_technologies",
            joinColumns = @JoinColumn(name = "project_id")
    )
    @Column(name = "technology", nullable = false, length = 120)
    private List<String> technologies = new ArrayList<>();

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    public Project() {}

    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        // boş kalmasın diye güvenlik
        if (shortDescription == null) shortDescription = "";
        if (longDescription == null) longDescription = "";

        // ✅ description NOT NULL -> boş kalmasın
        if (description == null) {
            // tercihen longDescription'dan türet
            description = (longDescription != null) ? longDescription : "";
        }

        if (displayOrder == null) displayOrder = 0;
    }

    // --- getters & setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getLongDescription() { return longDescription; }
    public void setLongDescription(String longDescription) { this.longDescription = longDescription; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLiveUrl() { return liveUrl; }
    public void setLiveUrl(String liveUrl) { this.liveUrl = liveUrl; }

    public String getRepoUrl() { return repoUrl; }
    public void setRepoUrl(String repoUrl) { this.repoUrl = repoUrl; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public Integer getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = (displayOrder == null) ? 0 : displayOrder;
    }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) {
        this.features = (features == null) ? new ArrayList<>() : features;
    }

    public List<String> getTechnologies() { return technologies; }
    public void setTechnologies(List<String> technologies) {
        this.technologies = (technologies == null) ? new ArrayList<>() : technologies;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
