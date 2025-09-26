import React, { useState, useRef, useCallback } from 'react';
import { Send, MessageCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: number;
}

interface ProjectChatProps {
  projectId: string;
  currentUserId: string;
}

const ProjectChat: React.FC<ProjectChatProps> = ({ projectId, currentUserId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleSendMessage = useCallback(() => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      text: chatInput.trim(),
      senderId: currentUserId,
      senderName: 'You',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput('');
    scrollToBottom();

    // Dummy auto-reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: String(Date.now() + 1),
        text: 'Thanks! We will review your message soon.',
        senderId: 'project_owner_dummy',
        senderName: 'Project Owner',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, reply]);
      scrollToBottom();
    }, 1000);
  }, [chatInput, currentUserId]);

  return (
    <div className="p-4 bg-white rounded-xl border h-96 flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4 p-2 space-y-3">
        {messages.map((m) => {
          const isCurrentUser = m.senderId === currentUserId;
          return (
            <div key={m.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${isCurrentUser ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-tl-none'}`}>
                {!isCurrentUser && <span className="block font-semibold text-xs mb-1">{m.senderName}</span>}
                {m.text}
                <span className={`block text-xs mt-1 ${isCurrentUser ? 'text-blue-200' : 'text-gray-500'} text-right`}>
                  {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
          placeholder="Type a message..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!chatInput.trim()}
          className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProjectChat;