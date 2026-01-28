package com.yucel.dayan.service;

import com.yucel.dayan.dto.experience.ExperienceDto;

import java.util.List;

public interface ExperienceService {

    // Public
    List<ExperienceDto> listPublic();

    // Admin
    List<ExperienceDto> listAdmin();

    ExperienceDto create(ExperienceDto dto);

    ExperienceDto update(Long id, ExperienceDto dto);

    void delete(Long id);
}
