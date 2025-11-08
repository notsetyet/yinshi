import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Users } from "lucide-react";

interface Recipe {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: number;
  servings: number;
  difficulty: "easy" | "medium" | "hard";
  ingredients: string[];
  steps: string[];
}

const RecipeRecommendations = () => {
  const recipes: Recipe[] = [
    {
      id: "1",
      name: "番茄鸡蛋面",
      category: "主食",
      calories: 420,
      protein: 18,
      carbs: 65,
      fat: 8,
      time: 20,
      servings: 1,
      difficulty: "easy",
      ingredients: ["面条 100g", "鸡蛋 2个", "番茄 2个", "葱花适量", "盐、酱油适量"],
      steps: [
        "番茄切块，鸡蛋打散备用",
        "锅中烧水，水开后下面条煮熟",
        "另起锅热油，倒入蛋液炒散盛出",
        "锅中加油炒番茄至软烂，加入炒好的鸡蛋",
        "加入适量水煮开，加盐和酱油调味",
        "将煮好的面条捞出放入碗中，浇上番茄鸡蛋汤",
      ],
    },
    {
      id: "2",
      name: "鸡胸肉沙拉",
      category: "减脂餐",
      calories: 280,
      protein: 35,
      carbs: 15,
      fat: 6,
      time: 15,
      servings: 1,
      difficulty: "easy",
      ingredients: [
        "鸡胸肉 150g",
        "生菜 100g",
        "圣女果 5个",
        "黄瓜 1根",
        "橄榄油、黑胡椒适量",
      ],
      steps: [
        "鸡胸肉切块，用盐和黑胡椒腌制10分钟",
        "平底锅少油煎鸡胸肉至两面金黄",
        "生菜洗净撕小块，圣女果对半切，黄瓜切片",
        "将所有蔬菜和鸡胸肉混合",
        "淋上少许橄榄油和柠檬汁，撒黑胡椒调味",
      ],
    },
    {
      id: "3",
      name: "三色藜麦饭",
      category: "主食",
      calories: 350,
      protein: 12,
      carbs: 68,
      fat: 4,
      time: 30,
      servings: 2,
      difficulty: "easy",
      ingredients: ["三色藜麦 100g", "大米 50g", "玉米粒 50g", "青豆 30g"],
      steps: [
        "藜麦和大米分别淘洗干净",
        "将藜麦和大米放入电饭煲，加入适量水",
        "加入玉米粒和青豆",
        "按下煮饭键，煮熟后焖5分钟",
        "开盖搅拌均匀即可",
      ],
    },
    {
      id: "4",
      name: "清蒸鲈鱼",
      category: "优质蛋白",
      calories: 180,
      protein: 32,
      carbs: 2,
      fat: 5,
      time: 25,
      servings: 2,
      difficulty: "medium",
      ingredients: ["鲈鱼 1条", "姜片适量", "葱丝适量", "蒸鱼豉油 2勺", "料酒 1勺"],
      steps: [
        "鲈鱼处理干净，在鱼身两侧划几刀",
        "在鱼身和鱼腹内放入姜片，淋上料酒腌制10分钟",
        "蒸锅水开后放入鱼，大火蒸8-10分钟",
        "取出鱼，倒掉盘中的汤汁",
        "撒上葱丝，淋上热油和蒸鱼豉油",
      ],
    },
    {
      id: "5",
      name: "燕麦香蕉松饼",
      category: "早餐",
      calories: 320,
      protein: 14,
      carbs: 48,
      fat: 8,
      time: 15,
      servings: 1,
      difficulty: "easy",
      ingredients: ["燕麦片 50g", "香蕉 1根", "鸡蛋 1个", "牛奶 50ml", "蜂蜜适量"],
      steps: [
        "香蕉捣成泥，加入鸡蛋和牛奶搅拌均匀",
        "加入燕麦片，搅拌成面糊",
        "平底锅小火加热，倒入一勺面糊",
        "煎至两面金黄，约2分钟一面",
        "装盘后淋上蜂蜜即可",
      ],
    },
    {
      id: "6",
      name: "香菇炖鸡汤",
      category: "汤品",
      calories: 220,
      protein: 28,
      carbs: 8,
      fat: 6,
      time: 90,
      servings: 4,
      difficulty: "medium",
      ingredients: [
        "鸡腿 4个",
        "干香菇 10朵",
        "红枣 6颗",
        "枸杞适量",
        "姜片适量",
        "盐适量",
      ],
      steps: [
        "鸡腿洗净焯水去血沫",
        "干香菇提前泡发",
        "将所有食材放入炖锅",
        "加入足量清水，大火煮开后转小火",
        "炖煮1.5小时至鸡肉软烂",
        "加盐调味即可",
      ],
    },
  ];

  const getDifficultyBadge = (difficulty: Recipe["difficulty"]) => {
    const variants = {
      easy: "default",
      medium: "secondary",
      hard: "destructive",
    };
    const labels = {
      easy: "简单",
      medium: "中等",
      hard: "困难",
    };
    return (
      <Badge variant={variants[difficulty] as any}>{labels[difficulty]}</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>食谱推荐</CardTitle>
          <CardDescription>根据营养均衡原则为您推荐健康食谱</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {recipe.category}
                  </CardDescription>
                </div>
                {getDifficultyBadge(recipe.difficulty)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.time}分钟</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  <span>{recipe.calories} kcal</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings}人份</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">蛋白质</p>
                  <p className="font-medium text-foreground">{recipe.protein}g</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">碳水</p>
                  <p className="font-medium text-foreground">{recipe.carbs}g</p>
                </div>
                <div className="p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">脂肪</p>
                  <p className="font-medium text-foreground">{recipe.fat}g</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">食材</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>• {ingredient}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-foreground mb-2">步骤</p>
                <ol className="text-sm text-muted-foreground space-y-1">
                  {recipe.steps.map((step, idx) => (
                    <li key={idx}>
                      {idx + 1}. {step}
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecipeRecommendations;
