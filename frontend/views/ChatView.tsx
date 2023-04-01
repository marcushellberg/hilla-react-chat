import { TextFieldChangeEvent } from '@vaadin/text-field/src/vaadin-text-field.js';
import { MessageInputSubmitEvent } from '@vaadin/message-input/src/vaadin-message-input.js';
import { useEffect, useState } from 'react';
import Message from 'Frontend/generated/com/example/application/endpoints/ChatService/Message';
import { ChatService } from 'Frontend/generated/endpoints.js';
import { MessageList } from '@hilla/react-components/MessageList.js';
import { MessageInput } from '@hilla/react-components/MessageInput.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { Button } from '@hilla/react-components/Button.js';

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const sub = ChatService.join().onNext((message) => {
      setMessages((prevState) => [...prevState, message]);
    });

    return () => sub.cancel();
  }, []);

  function sendMessage(e: MessageInputSubmitEvent) {
    ChatService.send(userName, e.detail.value);
  }

  function handleInput(e: TextFieldChangeEvent) {
    setInput(e.target.value);
  }

  function logIn() {
    setUserName(input);
    setInput('');
  }

  if (!userName) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex gap-m">
          <TextField
            placeholder="User name"
            value={input}
            onChange={handleInput}
          />
          <Button theme="primary" onClick={logIn}>
            Log in
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-m box-border h-full">
      <MessageList items={messages} className="flex-grow" />
      <MessageInput onSubmit={sendMessage} />
    </div>
  );
}
