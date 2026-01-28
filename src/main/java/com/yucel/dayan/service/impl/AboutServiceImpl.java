package com.yucel.dayan.service.impl;

import com.yucel.dayan.dto.about.AboutResponse;
import com.yucel.dayan.dto.about.UpdateAboutRequest;
import com.yucel.dayan.entity.About;
import com.yucel.dayan.repository.AboutRepository;
import com.yucel.dayan.service.AboutService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class AboutServiceImpl implements AboutService {

    private final AboutRepository aboutRepository;

    public AboutServiceImpl(AboutRepository aboutRepository) {
        this.aboutRepository = aboutRepository;
    }

    private About ensureOne() {
        return aboutRepository.findById(1L).orElseGet(() -> {
            About a = new About();
            a.setId(1L);

            a.setTitle("Hakkımda");
            a.setSubtitle("Modern web teknolojileriyle değer yaratan çözümler geliştiren full-stack developer");
            a.setBio("Modern web teknolojileriyle uçtan uca ürün geliştiren; performans, güvenilirlik ve kullanıcı deneyimi odaklı bir yazılım geliştiriciyim.");

            a.setHighlights(new ArrayList<>());
            a.setStats("[]");

            a.setEducationSchool("Harran Üniversitesi");
            a.setEducationDepartment("Bilgisayar Mühendisliği");
            a.setEducationYear("2022 - 2026");
            a.setEducationDesc("Yazılım geliştirme ve veri analizi odaklı eğitim. Algoritmalar, veri yapıları ve modern yazılım geliştirme yaklaşımları üzerine çalışmalar.");
            a.setEducationTags(new ArrayList<>());

            a.setGoalsDesc("Sürekli öğrenme ve yenilikçi bakış açımla modern teknolojilerle kullanıcı deneyimi güçlü çözümler geliştirmeyi hedefliyorum.");
            a.setGoalsTags(new ArrayList<>());

            a.setTechFrontend(new ArrayList<>());
            a.setTechBackend(new ArrayList<>());
            a.setTechTools(new ArrayList<>());

            return aboutRepository.save(a);
        });
    }

    private AboutResponse map(About a) {
        AboutResponse r = new AboutResponse();

        r.id = a.getId();

        r.title = a.getTitle();
        r.subtitle = a.getSubtitle();
        r.bio = a.getBio();

        r.highlights = a.getHighlights();
        r.stats = a.getStats();

        r.educationSchool = a.getEducationSchool();
        r.educationDepartment = a.getEducationDepartment();
        r.educationYear = a.getEducationYear();
        r.educationDesc = a.getEducationDesc();
        r.educationTags = a.getEducationTags();

        r.goalsDesc = a.getGoalsDesc();
        r.goalsTags = a.getGoalsTags();

        r.techFrontend = a.getTechFrontend();
        r.techBackend = a.getTechBackend();
        r.techTools = a.getTechTools();

        r.createdAt = a.getCreatedAt();
        r.updatedAt = a.getUpdatedAt();

        return r;
    }

    @Override
    public AboutResponse get() {
        return map(ensureOne());
    }

    @Override
    public AboutResponse update(UpdateAboutRequest req) {
        About a = ensureOne();

        // null-safe update: sadece gelenleri overwrite eder
        if (req.title != null) a.setTitle(req.title);
        if (req.subtitle != null) a.setSubtitle(req.subtitle);
        if (req.bio != null) a.setBio(req.bio);

        if (req.highlights != null) a.setHighlights(req.highlights);
        if (req.stats != null) a.setStats(req.stats);

        if (req.educationSchool != null) a.setEducationSchool(req.educationSchool);
        if (req.educationDepartment != null) a.setEducationDepartment(req.educationDepartment);
        if (req.educationYear != null) a.setEducationYear(req.educationYear);
        if (req.educationDesc != null) a.setEducationDesc(req.educationDesc);
        if (req.educationTags != null) a.setEducationTags(req.educationTags);

        if (req.goalsDesc != null) a.setGoalsDesc(req.goalsDesc);
        if (req.goalsTags != null) a.setGoalsTags(req.goalsTags);

        if (req.techFrontend != null) a.setTechFrontend(req.techFrontend);
        if (req.techBackend != null) a.setTechBackend(req.techBackend);
        if (req.techTools != null) a.setTechTools(req.techTools);

        return map(aboutRepository.save(a));
    }
}
