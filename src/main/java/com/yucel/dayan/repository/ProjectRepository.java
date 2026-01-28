// src/main/java/com/yucel/dayan/repository/ProjectRepository.java
package com.yucel.dayan.repository;

import com.yucel.dayan.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    // ✅ Projeleri admin panelde verilen sıraya göre getir
    List<Project> findAllByOrderByDisplayOrderAsc();
}
