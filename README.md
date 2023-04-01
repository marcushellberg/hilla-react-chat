# Full-stack reactive app with React, Spring Boot and Hilla

This app demonstrates a simple chat application built with
[Spring Boot](https://spring.io/projects/spring-boot),
[React](https://reactjs.org/),
and [Hilla] https://hilla.dev/.

## Requirements

- Java 17

Using the included `ChatGPTService` requires that you have
your [OpenAI API key](https://platform.openai.com/account/api-keys) as an environment variable:

```
OPENAI_API_KEY=your-key-here
```

## Running the app

You can run the app in development mode with the included Maven wrapper.

Mac/Linux

```
./mvnw
```

Windows

```
.\mvnw
```

This starts the Spring Boot application and a [Vite](https://vitejs.dev/) dev server.

## Further resources

You can learn more about hilla on https://hilla.dev.
