package com.yucel.dayan.dto.about;

import java.time.LocalDateTime;
import java.util.List;

public class AboutResponse {
    public Long id;

    public String title;
    public String subtitle;
    public String bio;

    public List<String> highlights;

    // jsonb alanını string taşıyalım (frontend isterse parse eder)
    public String stats;

    public String educationSchool;
    public String educationDepartment;
    public String educationYear;
    public String educationDesc;
    public List<String> educationTags;

    public String goalsDesc;
    public List<String> goalsTags;

    public List<String> techFrontend;
    public List<String> techBackend;
    public List<String> techTools;

    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}
