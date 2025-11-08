import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "您好！我是您的饮食健康助手。您可以：\n\n• 拍照识别食物\n• 咨询饮食建议\n• 了解营养知识\n• 获取食谱推荐\n\n请问有什么可以帮您的吗？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (userMessage: string, hasImage: boolean): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (hasImage) {
      return "我看到您分享了一张食物照片。这看起来像是健康的一餐！\n\n根据图片，我建议：\n• 注意食物的分量控制\n• 搭配适量蔬菜\n• 注意烹饪方式，建议少油少盐\n\n如果您想了解具体的营养成分，可以在\"饮食记录\"中手动添加详细信息。";
    }
    
    if (lowerMessage.includes("减肥") || lowerMessage.includes("减脂")) {
      return "关于健康减脂，我建议：\n\n1. 控制热量摄入，每日减少300-500kcal\n2. 保持蛋白质摄入，每公斤体重1.6-2g\n3. 选择低GI碳水，如糙米、燕麦\n4. 增加蔬菜摄入量，每餐至少一半是蔬菜\n5. 配合适量运动，每周3-5次\n\n建议查看\"食谱推荐\"中的减脂餐选项！";
    }
    
    if (lowerMessage.includes("早餐") || lowerMessage.includes("breakfast")) {
      return "健康早餐建议：\n\n碳水：全麦面包、燕麦、杂粮粥\n蛋白质：鸡蛋、牛奶、豆浆\n维生素：水果、蔬菜\n\n推荐搭配：\n• 燕麦 + 鸡蛋 + 香蕉\n• 全麦面包 + 牛奶 + 水果\n• 杂粮粥 + 鸡蛋 + 青菜\n\n早餐应占全天热量的25-30%哦！";
    }
    
    if (lowerMessage.includes("蛋白质") || lowerMessage.includes("protein")) {
      return "优质蛋白质来源：\n\n动物性蛋白：\n• 鸡胸肉、瘦牛肉（蛋白质含量高）\n• 鱼类（富含Omega-3）\n• 鸡蛋（完全蛋白）\n\n植物性蛋白：\n• 豆腐、豆浆\n• 藜麦\n• 坚果类\n\n成年人每日推荐摄入量：每公斤体重0.8-1g";
    }
    
    if (lowerMessage.includes("水") || lowerMessage.includes("喝")) {
      return "每日饮水建议：\n\n成年人每日推荐饮水量：1500-2000ml\n\n最佳饮水时间：\n• 早晨起床后 250ml\n• 三餐前30分钟 200ml\n• 运动后及时补充\n• 睡前1小时 少量\n\n注意：\n避免一次性大量饮水，少量多次为宜。";
    }
    
    const responses = [
      "这是个很好的问题！根据营养学原理，建议您保持饮食多样化，每天摄入12种以上食物。",
      "我理解您的关注。建议您在\"营养分析\"标签查看您的营养摄入情况，我会根据数据给出更精准的建议。",
      "关于这个问题，建议您咨询专业营养师获取个性化方案。我可以为您提供一般性的营养建议作为参考。",
      "您可以在\"食谱推荐\"中找到适合的健康食谱，都是经过营养配比的哦！",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // 模拟AI响应延迟
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input, false),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "文件格式错误",
        description: "请上传图片文件",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: "我拍了张食物照片",
        image: imageUrl,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: generateResponse("", true),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[calc(100vh-16rem)]">
      <CardHeader>
        <CardTitle>智能饮食助手</CardTitle>
        <CardDescription>与AI对话，获取个性化饮食建议</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.role === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div
                className={`flex-1 max-w-[80%] ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="上传的食物图片"
                    className="max-w-full h-auto rounded-lg mb-2 border border-border"
                  />
                )}
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入消息或拍照识别食物..."
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
