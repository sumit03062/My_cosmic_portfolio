import { useState, useEffect } from 'react';
import { 
  subscribeToMessages, 
  sendMessage,
  FirebaseMessage 
} from '@/services/chatService';
import { FileInput} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';


export default function AdminDashboard() {
  const [conversations, setConversations] = useState<{
    [email: string]: FirebaseMessage[];
  }>({});
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    return subscribeToMessages((messages) => {
      const grouped = messages.reduce((acc, msg) => {
        const key = msg.email || 'anonymous';
        return {
          ...acc,
          [key]: [...(acc[key] || []), msg]
        };
      }, {} as { [key: string]: FirebaseMessage[] });
      setConversations(grouped);
    }, true); // Mark as read when admin views
  }, []);

  const handleSendReply = async () => {
    if (!activeChat) return;
    
    await sendMessage(reply, 'admin', {
      attachments,
      email: activeChat === 'anonymous' ? undefined : activeChat
    });
    
    setReply('');
    setAttachments([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Conversation List */}
      <Card className="lg:col-span-1">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <div className="divide-y">
          {Object.entries(conversations).map(([email, messages]) => (
            <div 
              key={email}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                activeChat === email ? 'bg-blue-50' : ''
              }`}
              onClick={() => setActiveChat(email)}
            >
              <div className="flex justify-between">
                <p className="font-medium">{email || 'Anonymous'}</p>
                <Badge variant="outline">
                  {messages.filter(m => m.status !== 'read').length}
                </Badge>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {messages[messages.length - 1].content}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <div className="lg:col-span-2 space-y-6">
        {activeChat ? (
          <>
            <Card>
              <div className="p-4 border-b">
                <h3 className="font-bold">
                  {activeChat === 'anonymous' ? 'Anonymous User' : activeChat}
                </h3>
              </div>
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {conversations[activeChat].map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === 'admin' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'admin'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p>{msg.content}</p>
                      {msg.attachments?.map((file) => (
                        <a
                          key={file.url}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2 text-sm underline"
                        >
                          📎 {file.name}
                        </a>
                      ))}
                      <p className="text-xs opacity-70 mt-1">
                        {msg.sender} • {msg.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="p-4 space-y-4">
                <Textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  rows={3}
                />
                
                <div className="flex items-center gap-4">
                  <FileInput 
                    onChange={handleAttachment}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  
                  <Button 
                    onClick={handleSendReply}
                    disabled={!reply.trim() && attachments.length === 0}
                  >
                    Send Reply
                  </Button>
                </div>

                {attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {attachments.map((file, i) => (
                      <div key={i} className="text-sm flex items-center gap-2">
                        <span>{file.name}</span>
                        <button 
                          onClick={() => setAttachments(
                            prev => prev.filter((_, index) => index !== i)
                          )}
                          className="text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </>
        ) : (
          <Card className="flex items-center justify-center h-96">
            <p>Select a conversation</p>
          </Card>
        )}
      </div>
    </div>
  );
}