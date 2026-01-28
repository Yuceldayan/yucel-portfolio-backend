package com.yucel.dayan.service.impl;

import com.yucel.dayan.dto.experience.ExperienceDto;
import com.yucel.dayan.entity.Experience;
import com.yucel.dayan.repository.ExperienceRepository;
import com.yucel.dayan.service.ExperienceService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ExperienceServiceImpl implements ExperienceService {

    private final ExperienceRepository repo;

    public ExperienceServiceImpl(ExperienceRepository repo) {
        this.repo = repo;
    }

    // -------- MAPPER --------
    private ExperienceDto toDto(Experience e) {
        ExperienceDto d = new ExperienceDto();
        d.id = e.getId();
        d.role = e.getRole();
        d.company = e.getCompany();
        d.location = e.getLocation();
        d.startDate = e.getStartDate();
        d.endDate = e.getEndDate();
        d.isCurrent = e.getIsCurrent();
        d.published = e.getPublished();
        d.orderIndex = e.getOrderIndex();
        d.description = e.getDescription();
        d.bulletsText = e.getBulletsText();
        d.technologiesText = e.getTechnologiesText();
        return d;
    }

    private void apply(Experience e, ExperienceDto d) {
        // Sınır yok: max @Size yok. Sadece zorunlu alan kontrolü.
        if (d.role == null || d.role.trim().isEmpty()) {
            throw new IllegalArgumentException("role zorunlu");
        }
        if (d.company == null || d.company.trim().isEmpty()) {
            throw new IllegalArgumentException("company zorunlu");
        }

        e.setRole(d.role.trim());
        e.setCompany(d.company.trim());
        e.setLocation(d.location != null ? d.location.trim() : null);

        e.setStartDate(d.startDate != null ? d.startDate.trim() : null);

        boolean current = d.isCurrent != null && d.isCurrent;
        e.setIsCurrent(current);

        // Devam ediyorsa endDate boş
        if (current) e.setEndDate(null);
        else e.setEndDate(d.endDate != null ? d.endDate.trim() : null);

        e.setPublished(d.published == null ? true : d.published);
        e.setOrderIndex(d.orderIndex == null ? 0 : d.orderIndex);

        // Uzun metinler: aynen (format bozulmasın)
        e.setDescription(d.description);
        e.setBulletsText(d.bulletsText);
        e.setTechnologiesText(d.technologiesText);
    }

    // -------- PUBLIC --------
    @Override
    public List<ExperienceDto> listPublic() {
        return repo.findAllByPublishedTrueOrderByOrderIndexAscStartDateDesc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    // -------- ADMIN --------
    @Override
    public List<ExperienceDto> listAdmin() {
        return repo.findAllByOrderByOrderIndexAscStartDateDesc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    @Override
    @Transactional
    public ExperienceDto create(ExperienceDto dto) {
        Experience e = new Experience();
        apply(e, dto);
        repo.save(e);
        return toDto(e);
    }

    @Override
    @Transactional
    public ExperienceDto update(Long id, ExperienceDto dto) {
        Experience e = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Deneyim bulunamadı"));
        apply(e, dto);
        repo.save(e);
        return toDto(e);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) throw new IllegalArgumentException("Deneyim bulunamadı");
        repo.deleteById(id);
    }
}
