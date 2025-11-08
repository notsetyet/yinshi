import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface FoodEntry {
  id: string;
  date: string;
  meal: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const NutritionAnalysis = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("foodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const getWeeklyData = () => {
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return entries.filter((e) => {
      const entryDate = new Date(e.date);
      return entryDate >= weekAgo && entryDate <= today;
    });
  };

  const weeklyEntries = getWeeklyData();
  const weeklyTotal = weeklyEntries.reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const dailyAverage = {
    calories: weeklyTotal.calories / 7,
    protein: weeklyTotal.protein / 7,
    carbs: weeklyTotal.carbs / 7,
    fat: weeklyTotal.fat / 7,
  };

  // 推荐每日摄入量（示例值）
  const recommended = {
    calories: 2000,
    protein: 60,
    carbs: 275,
    fat: 60,
  };

  const getPercentage = (value: number, target: number) => {
    return Math.min((value / target) * 100, 100);
  };

  const getTrend = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage > 110) return { icon: TrendingUp, color: "text-destructive", label: "偏高" };
    if (percentage < 90) return { icon: TrendingDown, color: "text-yellow-500", label: "偏低" };
    return { icon: Minus, color: "text-green-500", label: "正常" };
  };

  const nutritionItems = [
    {
      name: "热量",
      value: dailyAverage.calories,
      target: recommended.calories,
      unit: "kcal",
      color: "bg-primary",
    },
    {
      name: "蛋白质",
      value: dailyAverage.protein,
      target: recommended.protein,
      unit: "g",
      color: "bg-blue-500",
    },
    {
      name: "碳水化合物",
      value: dailyAverage.carbs,
      target: recommended.carbs,
      unit: "g",
      color: "bg-green-500",
    },
    {
      name: "脂肪",
      value: dailyAverage.fat,
      target: recommended.fat,
      unit: "g",
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>每周营养分析</CardTitle>
          <CardDescription>过去7天的平均每日营养摄入</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {nutritionItems.map((item) => {
            const trend = getTrend(item.value, item.target);
            const TrendIcon = trend.icon;
            
            return (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className={`text-xs ${trend.color} flex items-center gap-1`}>
                      <TrendIcon className="h-3 w-3" />
                      {trend.label}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.value.toFixed(1)} / {item.target} {item.unit}
                  </span>
                </div>
                <Progress 
                  value={getPercentage(item.value, item.target)} 
                  className="h-2"
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>营养建议</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyAverage.calories < recommended.calories * 0.9 && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">热量摄入不足：</span>
                  您的平均每日热量摄入低于推荐值，建议适当增加主食和健康脂肪的摄入。
                </p>
              </div>
            )}
            
            {dailyAverage.protein < recommended.protein * 0.9 && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">蛋白质摄入不足：</span>
                  建议增加瘦肉、鱼类、豆制品等优质蛋白来源。
                </p>
              </div>
            )}
            
            {dailyAverage.carbs > recommended.carbs * 1.1 && (
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">碳水化合物偏高：</span>
                  建议减少精制碳水的摄入，选择全谷物和粗粮。
                </p>
              </div>
            )}
            
            {Math.abs(dailyAverage.calories - recommended.calories) < recommended.calories * 0.1 &&
             Math.abs(dailyAverage.protein - recommended.protein) < recommended.protein * 0.1 && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-medium">营养均衡：</span>
                  您的饮食营养搭配良好，请继续保持！
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>数据说明</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            以上数据基于您过去7天的饮食记录计算得出。推荐值为成年人平均每日营养需求参考值，
            实际需求因个人身高、体重、活动量等因素而异。如需更精准的营养指导，建议咨询专业营养师。
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionAnalysis;
