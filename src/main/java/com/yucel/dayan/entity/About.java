package com.yucel.dayan.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "about")
public class About {

    @Id
    private Long id; // tek kayıt: 1

    @Column(name = "title", nullable = false, length = 160)
    private String title = "Hakkımda";

    @Column(name = "subtitle", nullable = false, length = 260)
    private String subtitle = "";

    @Column(name = "bio", nullable = false, columnDefinition = "text")
    private String bio = "";

    // TEXT[] -> List<String>
    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "highlights", nullable = false, columnDefinition = "text[]")
    private List<String> highlights = new ArrayList<>();

    // JSONB -> String (en stabil ve hızlı çözüm)
    // İstersen bunu List<StatItem> de yaparız, şimdilik string yeterli.
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "stats", nullable = false, columnDefinition = "jsonb")
    private String stats = "[]";

    @Column(name = "education_school", nullable = false, length = 200)
    private String educationSchool = "";

    @Column(name = "education_department", nullable = false, length = 200)
    private String educationDepartment = "";

    @Column(name = "education_year", nullable = false, length = 60)
    private String educationYear = "";

    @Column(name = "education_desc", nullable = false, columnDefinition = "text")
    private String educationDesc = "";

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "education_tags", nullable = false, columnDefinition = "text[]")
    private List<String> educationTags = new ArrayList<>();

    @Column(name = "goals_desc", nullable = false, columnDefinition = "text")
    private String goalsDesc = "";

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "goals_tags", nullable = false, columnDefinition = "text[]")
    private List<String> goalsTags = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tech_frontend", nullable = false, columnDefinition = "text[]")
    private List<String> techFrontend = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tech_backend", nullable = false, columnDefinition = "text[]")
    private List<String> techBackend = new ArrayList<>();

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "tech_tools", nullable = false, columnDefinition = "text[]")
    private List<String> techTools = new ArrayList<>();

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        if (createdAt == null) createdAt = now;
        if (updatedAt == null) updatedAt = now;

        if (title == null) title = "Hakkımda";
        if (subtitle == null) subtitle = "";
        if (bio == null) bio = "";
        if (highlights == null) highlights = new ArrayList<>();
        if (stats == null) stats = "[]";
        if (educationSchool == null) educationSchool = "";
        if (educationDepartment == null) educationDepartment = "";
        if (educationYear == null) educationYear = "";
        if (educationDesc == null) educationDesc = "";
        if (educationTags == null) educationTags = new ArrayList<>();
        if (goalsDesc == null) goalsDesc = "";
        if (goalsTags == null) goalsTags = new ArrayList<>();
        if (techFrontend == null) techFrontend = new ArrayList<>();
        if (techBackend == null) techBackend = new ArrayList<>();
        if (techTools == null) techTools = new ArrayList<>();
    }

    // getters/setters (kısa)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) {
        this.highlights = (highlights == null) ? new ArrayList<>() : highlights;
    }

    public String getStats() { return stats; }
    public void setStats(String stats) { this.stats = (stats == null ? "[]" : stats); }

    public String getEducationSchool() { return educationSchool; }
    public void setEducationSchool(String educationSchool) { this.educationSchool = educationSchool; }

    public String getEducationDepartment() { return educationDepartment; }
    public void setEducationDepartment(String educationDepartment) { this.educationDepartment = educationDepartment; }

    public String getEducationYear() { return educationYear; }
    public void setEducationYear(String educationYear) { this.educationYear = educationYear; }

    public String getEducationDesc() { return educationDesc; }
    public void setEducationDesc(String educationDesc) { this.educationDesc = educationDesc; }

    public List<String> getEducationTags() { return educationTags; }
    public void setEducationTags(List<String> educationTags) {
        this.educationTags = (educationTags == null) ? new ArrayList<>() : educationTags;
    }

    public String getGoalsDesc() { return goalsDesc; }
    public void setGoalsDesc(String goalsDesc) { this.goalsDesc = goalsDesc; }

    public List<String> getGoalsTags() { return goalsTags; }
    public void setGoalsTags(List<String> goalsTags) {
        this.goalsTags = (goalsTags == null) ? new ArrayList<>() : goalsTags;
    }

    public List<String> getTechFrontend() { return techFrontend; }
    public void setTechFrontend(List<String> techFrontend) {
        this.techFrontend = (techFrontend == null) ? new ArrayList<>() : techFrontend;
    }

    public List<String> getTechBackend() { return techBackend; }
    public void setTechBackend(List<String> techBackend) {
        this.techBackend = (techBackend == null) ? new ArrayList<>() : techBackend;
    }

    public List<String> getTechTools() { return techTools; }
    public void setTechTools(List<String> techTools) {
        this.techTools = (techTools == null) ? new ArrayList<>() : techTools;
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
