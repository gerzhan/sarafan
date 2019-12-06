package ru.helpcontrol.sanbox.sarafan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.helpcontrol.sanbox.sarafan.domain.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
