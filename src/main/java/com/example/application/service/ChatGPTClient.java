package com.example.application.service;

import com.example.application.service.data.ChatGPTResponse;
import com.example.application.service.data.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class ChatGPTClient {

    @Value("${openai.api.key}")
    String openAiApiKey;
    private final WebClient webClient;

    public ChatGPTClient() {
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1/chat/completions")
                .build();
    }

    public Mono<String> generateCompletion(List<Message> messages) {
        return webClient.post()
                .header("Authorization", "Bearer " + openAiApiKey)
                .bodyValue(Map.of(
                        "model", "gpt-3.5-turbo",
                        "messages", messages
                ))
                .retrieve()
                .bodyToMono(ChatGPTResponse.class)
                .map(response -> response.getChoices().get(0).getMessage().getContent());
    }
}
