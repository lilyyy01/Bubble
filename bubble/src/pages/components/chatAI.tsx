import React, { useState, FormEvent, ChangeEvent } from 'react';
import styled from "styled-components";

const ChatContainer = styled.div`
  padding: 20px;
  background-color: #f5cebc;
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  max-width: 500px; // Adjust as needed
  margin: 0 auto; // Center the container
`;

const ChatHeader = styled.h1`
  text-align: center;
  color: #264143;
`;

const ChatSubheading = styled.h3`
  text-align: center;
  color: #264143;
  margin-bottom: 20px;
`;

const MessageList = styled.div`
  max-height: 300px; // Adjust as needed
  overflow-y: auto;
`;

const Message = styled.p`
  background: #FFFFFF;
  border: 1px solid #264143;
  border-radius: 4px;
  padding: 8px;
  margin: 10px 0;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 12px 10px;
  margin-top: 10px;
  border-radius: 4px;
  border: 2px solid #264143;
  box-shadow: 3px 4px 0px 1px #E99F4C;
`;

const SendButton = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  width: 100%;
  background: #e071a3;
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #E99F4C;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }
`;

const TypingIndicator = styled.div`
  height: 20px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: #264143;
    border-radius: 50%;
    animation: typing 1s infinite ease;
  }

  &:after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    margin: 0 2px;
    background-color: #264143;
    border-radius: 50%;
    animation: typing 1s infinite ease 0.5s;
  }

  @keyframes typing {
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
  }
`;


interface Message {
    role: 'user' | 'bot';
    content: string;
}

const Chatbot: React.FC = () => {
    const [userMessage, setUserMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBotTyping, setIsBotTyping] = useState(false);


    const generateTextFromPrompt = async (prompt: string) => {
        setIsBotTyping(true);
        const resp = await fetch('/api/chat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt })
        });
        setIsBotTyping(false);
        const respJson = await resp.json();
        setMessages(msgs => [...msgs, { role: 'bot', content: respJson.result }]);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!userMessage.trim()) return;
        setMessages(msgs => [...msgs, { role: 'user', content: userMessage }]);
        await generateTextFromPrompt(userMessage);
        setUserMessage('');
    };

    return (
        <ChatContainer>
            <ChatHeader>Chat with Bubble</ChatHeader>
            <ChatSubheading>Bubble is an AI-powered chatbot designed to suggest activities for you to do in your city</ChatSubheading>
            <MessageList>
                {messages.map((message, index) => (
                    <Message key={index}>
                        <strong>{message.role === 'bot' ? 'Bubble: ' : 'You: '}</strong>
                        {message.content}
                    </Message>
                ))}
                {isBotTyping && <TypingIndicator />}
            </MessageList>
            <form onSubmit={handleSubmit}>
                <ChatInput
                    type="text"
                    placeholder="Hello! I am Bubble, your AI-powered activity suggestion chatbot."
                    value={userMessage}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserMessage(e.target.value)}
                />
                <SendButton type="submit">Send</SendButton>
            </form>
        </ChatContainer>
    );
};

export default Chatbot;
