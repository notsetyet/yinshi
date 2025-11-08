import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const FoodLog = () => {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [food, setFood] = useState("");
  const [meal, setMeal] = useState("breakfast");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("foodEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const saveEntries = (newEntries: FoodEntry[]) => {
    setEntries(newEntries);
    localStorage.setItem("foodEntries", JSON.stringify(newEntries));
  };

  const addEntry = () => {
    if (!food || !calories) {
      toast({
        title: "请填写必填项",
        description: "食物名称和热量是必填的",
        variant: "destructive",
      });
      return;
    }

    const newEntry: FoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      meal,
      food,
      calories: parseFloat(calories),
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
    };

    saveEntries([newEntry, ...entries]);
    setFood("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    
    toast({
      title: "添加成功",
      description: "饮食记录已保存",
    });
  };

  const deleteEntry = (id: string) => {
    saveEntries(entries.filter((e) => e.id !== id));
    toast({
      title: "删除成功",
      description: "记录已删除",
    });
  };

  const getTodayEntries = () => {
    const today = new Date().toISOString().split("T")[0];
    return entries.filter((e) => e.date === today);
  };

  const todayTotal = getTodayEntries().reduce(
    (acc, entry) => ({
      calories: acc.calories + entry.calories,
      protein: acc.protein + entry.protein,
      carbs: acc.carbs + entry.carbs,
      fat: acc.fat + entry.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>添加饮食记录</CardTitle>
          <CardDescription>记录您的每日饮食</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meal">餐次</Label>
              <select
                id="meal"
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="breakfast">早餐</option>
                <option value="lunch">午餐</option>
                <option value="dinner">晚餐</option>
                <option value="snack">加餐</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="food">食物名称 *</Label>
              <Input
                id="food"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="例如：米饭"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">热量 (kcal) *</Label>
              <Input
                id="calories"
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">蛋白质 (g)</Label>
              <Input
                id="protein"
                type="number"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">碳水 (g)</Label>
              <Input
                id="carbs"
                type="number"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">脂肪 (g)</Label>
              <Input
                id="fat"
                type="number"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <Button onClick={addEntry} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            添加记录
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>今日摄入统计</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{todayTotal.calories.toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">热量 (kcal)</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{todayTotal.protein.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">蛋白质 (g)</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{todayTotal.carbs.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">碳水 (g)</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-foreground">{todayTotal.fat.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">脂肪 (g)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>今日记录</CardTitle>
        </CardHeader>
        <CardContent>
          {getTodayEntries().length === 0 ? (
            <p className="text-center text-muted-foreground py-8">暂无今日记录</p>
          ) : (
            <div className="space-y-3">
              {getTodayEntries().map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {entry.meal === "breakfast" && "早餐"}
                        {entry.meal === "lunch" && "午餐"}
                        {entry.meal === "dinner" && "晚餐"}
                        {entry.meal === "snack" && "加餐"}
                      </span>
                      <span className="font-medium text-foreground">{entry.food}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.calories} kcal | 蛋白质 {entry.protein}g | 碳水 {entry.carbs}g | 脂肪 {entry.fat}g
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodLog;
