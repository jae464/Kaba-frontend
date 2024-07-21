export interface MessageRequest {
  character: string;
  messages: Message[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
