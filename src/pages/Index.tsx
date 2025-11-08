import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UtensilsCrossed, LineChart, BookOpen, MessageSquare } from "lucide-react";
import FoodLog from "@/components/diet/FoodLog";
import NutritionAnalysis from "@/components/diet/NutritionAnalysis";
import RecipeRecommendations from "@/components/diet/RecipeRecommendations";
import AIChat from "@/components/diet/AIChat";

const Index = () => {
  const [activeTab, setActiveTab] = useState("log");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">饮食健康管家</h1>
          <p className="text-sm text-muted-foreground">记录饮食，智能分析，健康生活</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="log" className="flex items-center gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">饮食记录</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">营养分析</span>
            </TabsTrigger>
            <TabsTrigger value="recipes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">食谱推荐</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">智能助手</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="log">
            <FoodLog />
          </TabsContent>

          <TabsContent value="analysis">
            <NutritionAnalysis />
          </TabsContent>

          <TabsContent value="recipes">
            <RecipeRecommendations />
          </TabsContent>

          <TabsContent value="chat">
            <AIChat />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
