package com.example.application.endpoints;

import com.example.application.service.ChatGPTService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;

@BrowserCallable
@AnonymousAllowed
public class ChatService {

    private final ChatGPTService chatGPTService;

    public record Message(
            String userName,
            String text,
            Instant time
    ) {
    }

    Sinks.Many<Message> chatSink = Sinks.many().multicast().directBestEffort();
    Flux<Message> chat = chatSink.asFlux();

    ChatService(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    public Flux<Message> join() {
        return chat;
    }

    public void send(String userName, String text) {
        chatSink.tryEmitNext(
                new Message(userName, text, Instant.now())
        );
        chatGPTService.getAnswer(text).subscribe(answer -> {
            chatSink.tryEmitNext(
                    new Message("Charles GPT", answer, Instant.now())
            );
        });
    }

}
