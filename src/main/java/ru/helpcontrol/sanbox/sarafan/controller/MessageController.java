package ru.helpcontrol.sanbox.sarafan.controller;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.helpcontrol.sanbox.sarafan.domain.Message;
import ru.helpcontrol.sanbox.sarafan.repository.MessageRepository;

@RestController
@RequestMapping("messages")
public class MessageController {

    private final MessageRepository messageRepo;

    @Autowired
    public MessageController(MessageRepository messageRepo) {
        this.messageRepo = messageRepo;
        this.messageRepo.save(new Message("First message"));
        this.messageRepo.save(new Message("Seccond message"));
        this.messageRepo.save(new Message("Third message"));
    }

    @GetMapping
    public List<Message> list() {
        return messageRepo.findAll();
    }

    @GetMapping("{id}")
    public Message getOne(@PathVariable("id") Message message) {
        return message;
    }

    @PostMapping
    public Message createOne(@RequestBody Message message) {
        return messageRepo.save(message);
    }

    @PutMapping("{id}")
    public Message updateOne(@PathVariable("id") Message messageFromDB, @RequestBody Message messageUser) {
        BeanUtils.copyProperties(messageUser, messageFromDB, "id");
        return messageRepo.save(messageFromDB);
    }

    @DeleteMapping("{id}")
    public void deleteOne(@PathVariable("id") Message message) {
        messageRepo.delete(message);
    }
}
