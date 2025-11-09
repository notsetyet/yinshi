import { useState, useRef, useEffect } from "react";
import { Send, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const HealthAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput: string): string => {
    const responses = [
      "作为您的健康管家，我建议您保持规律的作息时间，这对整体健康非常重要。",
      "根据您的情况，建议每天保持适量运动，比如散步30分钟。",
      "保持良好的心态对健康很重要，建议您多参与一些放松身心的活动。",
      "充足的睡眠是健康的基础，建议每晚保持7-8小时的睡眠时间。",
      "定期体检可以帮助及早发现健康问题，建议您每年进行一次全面体检。",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: generateResponse(input),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-foreground">健康管家</h1>
          <p className="text-xs text-muted-foreground">智能助手为您提供健康建议</p>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((message, index) => (
            <div key={index}>
              <div
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
              {message.role === "assistant" && (
                <div className="flex justify-start mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/")}
                    className="rounded-full text-xs"
                  >
                    <Utensils className="h-3 w-3 mr-1" />
                    饮食健康管家
                  </Button>
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl px-4 py-2">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border bg-card p-4 space-y-3">
          <div className="flex">
            <Card
              className="p-2 cursor-pointer hover:bg-muted/50 transition-colors w-auto"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center gap-1.5">
                <Utensils className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">饮食健康管家</span>
              </div>
            </Card>
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入您的问题..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HealthAssistant;
