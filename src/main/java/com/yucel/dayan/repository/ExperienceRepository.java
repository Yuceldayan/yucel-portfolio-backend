package com.yucel.dayan.repository;

import com.yucel.dayan.entity.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findAllByPublishedTrueOrderByOrderIndexAscStartDateDesc();

    List<Experience> findAllByOrderByOrderIndexAscStartDateDesc();
}
