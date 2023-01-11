package com.example.application.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;
import java.util.List;

@Endpoint
@AnonymousAllowed
public class ChatService {

    public record Message(
            String userName,
            String text,
            Instant date
    ) {
    }

    Sinks.Many<Message> chatSink = Sinks.many().multicast().directBestEffort();
    Flux<Message> chat = chatSink.asFlux();

    public Flux<Message> join() {
        return chat;
    }

    public void send(String userName, String text) {
        chatSink.tryEmitNext(
                new Message(userName, text, Instant.now())
        );
    }

}
