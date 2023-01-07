package com.example.application.endpoints;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;

@Endpoint
@AnonymousAllowed
class ChatService {

	record Message(String userName, String text, Instant time) {
	}

	private final Sinks.Many<Message> chatSink = Sinks.many().multicast().directBestEffort();
	private final Flux<Message> chat = chatSink.asFlux().replay(10).autoConnect();


	public Flux<Message> join() {
		return chat;
	}

	public void send(String message, String userName) {
		chatSink.emitNext(new Message(userName, message, Instant.now()),
				(signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED);
	}

}
