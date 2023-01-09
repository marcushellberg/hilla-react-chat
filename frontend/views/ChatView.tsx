import {MessageList} from "@hilla/react-components/MessageList.js";
import {useEffect, useState} from "react";
import Message from "Frontend/generated/com/example/application/endpoints/ChatService/Message.js";
import {ChatService} from "Frontend/generated/endpoints.js";
import {TextField} from "@hilla/react-components/TextField.js";
import {Button} from "@hilla/react-components/Button.js";
import {TextFieldChangeEvent} from "@vaadin/text-field/src/vaadin-text-field.js";
import {MessageInputSubmitEvent} from '@vaadin/message-input/src/vaadin-message-input.js'
import {MessageInput} from "@hilla/react-components/MessageInput.js";

export function ChatView() {
  const [userName, setUserName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  function logIn() {
    setUserName(input);
    setInput('');
  }

  useEffect(() => {
    const subscription = ChatService
      .join()
      .onNext(message =>
        setMessages(prev => [...prev, message]));

    return () => {
      subscription.cancel();
    };
  }, []);

  async function sendMessage(e: MessageInputSubmitEvent) {
    await ChatService.send(e.detail.value, userName);
    setInput('');
  }

  function handleInput(e: TextFieldChangeEvent) {
    setInput(e.target.value);
  }

  if (!userName) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex gap-m">
          <TextField value={input} placeholder="Username" className="flex-grow" onChange={handleInput}/>
          <Button theme="primary" onClick={logIn}>Log in</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <MessageList className="flex-grow" items={messages}/>
      <MessageInput onSubmit={sendMessage}/>
    </div>
  )
}