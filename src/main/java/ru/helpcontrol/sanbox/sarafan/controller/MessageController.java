package ru.helpcontrol.sanbox.sarafan.controller;

import org.springframework.web.bind.annotation.*;
import ru.helpcontrol.sanbox.sarafan.excepntions.NotFoundException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("messages")
public class MessageController {
    private int counter = 3;
    // TODO: delete demo-fake messages
    private List<Map<String, String>> messages = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{
            put("id", "1");
            put("text", "First message");
        }});
        add(new HashMap<String, String>() {{
            put("id", "2");
            put("text", "Seccond message");
        }});
        add(new HashMap<String, String>() {{
            put("id", "3");
            put("text", "Third message");
        }});
    }};

    @GetMapping
    public List<Map<String, String>> list() {
        return messages;
    }

    @GetMapping("{id}")
    public Map<String, String> getOne(@PathVariable String id) {
        return getMessageById(id);
    }

    private Map<String, String> getMessageById(@PathVariable String id) {
        return messages.stream().filter(messages -> messages.get("id").equals(id)).findFirst()
                .orElseThrow(NotFoundException::new);
    }

    @PostMapping
    public Map<String, String> createOne(@RequestBody Map<String, String> message) {
        message.put("id", String.valueOf(++counter));
        messages.add(message);
        return message;
    }

    @PutMapping("{id}")
    public Map<String, String> updateOne(@PathVariable String id, @RequestBody Map<String, String> message) {
        Map<String, String> messageStored = getMessageById(id);
        messageStored.putAll(message);
        messageStored.put("id", id);
        return messageStored;
    }

    @DeleteMapping("{id}")
    public void deleteOne(@PathVariable String id) {
        Map<String, String> messageStored = getMessageById(id);
        messages.remove(messageStored);
    }
}
