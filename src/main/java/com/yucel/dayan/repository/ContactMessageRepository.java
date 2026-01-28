// src/main/java/com/yucel/dayan/repository/ContactMessageRepository.java
package com.yucel.dayan.repository;

import com.yucel.dayan.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}
