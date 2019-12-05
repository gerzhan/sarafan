package ru.helpcontrol.sanbox.sarafan.repository;

import org.springframework.data.repository.CrudRepository;
import ru.helpcontrol.sanbox.sarafan.domain.Message;

public interface MessageRepository extends CrudRepository<Message, Long> {

}
