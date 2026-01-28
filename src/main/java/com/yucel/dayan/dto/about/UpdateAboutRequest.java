package com.yucel.dayan.dto.about;

import java.util.List;

public class UpdateAboutRequest {

    public String title;
    public String subtitle;
    public String bio;

    public List<String> highlights;
    public String stats; // jsonb string

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
}
