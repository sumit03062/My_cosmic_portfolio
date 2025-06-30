import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Send, User, Clock, ChevronDown } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToMessages, sendMessage, FirebaseMessage } from '@/services/chatService';

interface Message {
  id: string | number;
  content: string;
  sender: 'user' | 'owner';
  timestamp: Date;
}

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'initial',
          content: "Hello! Thanks for visiting my portfolio. How can I help you today?",
          sender: 'owner',
          timestamp: new Date(Date.now() - 1000 * 60 * 5)
        }
      ]);
    }

    const unsubscribe = subscribeToMessages((firebaseMessages: FirebaseMessage[]) => {
      if (firebaseMessages.length > 0) {
        const formattedMessages: Message[] = firebaseMessages.map(msg => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender === 'admin' ? 'owner' : 'user',
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date()
        }));
        setMessages(formattedMessages);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    try {
      await sendMessage(message, 'visitor'); // 'visitor' maps to 'user'
      setIsTyping(true);

      setTimeout(async () => {
        const responses = [
          "Thanks for your message! I'll get back to you as soon as possible.",
          "That's an interesting question. Let me think about that for a moment.",
          "I appreciate your interest! Would you like to discuss this further over a call?",
          "Great point! I've worked on several projects like that before.",
          "I'd be happy to help with your project. Could you provide more details?"
        ];

        const responseContent = responses[Math.floor(Math.random() * responses.length)];

        await sendMessage(responseContent, 'admin'); // 'admin' maps to 'owner'

        setIsTyping(false);

        toast({
          title: "New message received",
          description: "You have a new response in your chat."
        });
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* Header Section */}
      <motion.section initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative pt-28 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 className="heading-xl mb-6 text-gradient">Let's Chat</motion.h1>
          <motion.p className="text-xl">Have questions or want to discuss a project? I'm here to help!</motion.p>
        </div>
      </motion.section>

      {/* Chat Section */}
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="py-16">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="chat">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="chat" className="flex-1">Live Chat</TabsTrigger>
              <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="chat">
              <Card className="border-none shadow-lg overflow-hidden">
                {/* Chat Header */}
                <div className="bg-portfolio-blue text-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold">Sumit Kumar</h3>
                      <p className="text-xs opacity-80">Usually responds within 1 hour</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <ChevronDown size={20} />
                  </Button>
                </div>

                {/* Messages */}
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
                    <AnimatePresence>
                      {messages.map((msg) => (
                        <motion.div key={msg.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-portfolio-blue text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 shadow-md rounded-tl-none'}`}>
                            <p>{msg.content}</p>
                            <div className={`text-xs mt-1 flex items-center ${msg.sender === 'user' ? 'text-white/70 justify-end' : 'text-gray-500 dark:text-gray-400'}`}>
                              <Clock size={12} className="mr-1" />
                              {formatTime(msg.timestamp)}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isTyping && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md rounded-tl-none">
                          <div className="flex space-x-1">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div key={i} animate={{ scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1, ease: "easeInOut", delay }} className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300" />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messageEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-4 border-t bg-white dark:bg-gray-800">
                    <div className="flex space-x-2">
                      <Textarea
                        placeholder="Type your message here..."
                        className="resize-none dark:bg-gray-700"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-portfolio-blue hover:bg-portfolio-purple"
                        disabled={!message.trim()}
                      >
                        <Send size={18} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-center text-gradient dark:text-gradient-dark">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {[
                      {
                        question: "What services do you offer?",
                        answer: "I offer web development, UI/UX design, mobile app development, and branding services."
                      },
                      {
                        question: "How much do your services cost?",
                        answer: "My rates vary depending on the scope and requirements of each project."
                      },
                      {
                        question: "What is your typical process for a new project?",
                        answer: "My process includes discovery, planning, design, development, testing, and launch."
                      },
                      {
                        question: "How long does a typical project take?",
                        answer: "A simple website might take 2-4 weeks, while more complex apps can take longer."
                      },
                      {
                        question: "Do you offer maintenance services?",
                        answer: "Yes, I offer ongoing support including updates, security patches, and feature additions."
                      }
                    ].map((faq, i) => (
                      <div key={i} className="border-b pb-6 last:border-b-0 last:pb-0 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-2 dark:text-white">{faq.question}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>
    </>
  );
};

export default ChatPage;
