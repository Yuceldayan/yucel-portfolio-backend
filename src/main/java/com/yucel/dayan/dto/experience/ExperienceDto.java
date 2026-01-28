package com.yucel.dayan.dto.experience;

public class ExperienceDto {
    public Long id;

    public String role;
    public String company;
    public String location;

    public String startDate; // YYYY-MM
    public String endDate;   // YYYY-MM
    public Boolean isCurrent;

    public Boolean published;
    public Integer orderIndex;

    public String description;
    public String bulletsText;
    public String technologiesText;
}
