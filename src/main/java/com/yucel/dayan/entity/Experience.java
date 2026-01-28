package com.yucel.dayan.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // DB tarafında TEXT olsa bile burada String; limit yok
    @Column(nullable = false, columnDefinition = "TEXT")
    private String role;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String company;

    @Column(columnDefinition = "TEXT")
    private String location;

    @Column(name = "start_date", columnDefinition = "TEXT")
    private String startDate; // YYYY-MM

    @Column(name = "end_date", columnDefinition = "TEXT")
    private String endDate;   // YYYY-MM

    @Column(name = "is_current", nullable = false)
    private Boolean isCurrent = false;

    @Column(nullable = false)
    private Boolean published = true;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex = 0;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "bullets_text", columnDefinition = "TEXT")
    private String bulletsText;

    @Column(name = "technologies_text", columnDefinition = "TEXT")
    private String technologiesText;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }

    public Boolean getIsCurrent() { return isCurrent; }
    public void setIsCurrent(Boolean isCurrent) { this.isCurrent = isCurrent; }

    public Boolean getPublished() { return published; }
    public void setPublished(Boolean published) { this.published = published; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBulletsText() { return bulletsText; }
    public void setBulletsText(String bulletsText) { this.bulletsText = bulletsText; }

    public String getTechnologiesText() { return technologiesText; }
    public void setTechnologiesText(String technologiesText) { this.technologiesText = technologiesText; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
