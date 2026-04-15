import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Clock, 
  Users,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import pastaCarbonaraImg from "@/assets/pasta-carbonara.jpg";
import quinoaBuddhaImg from "@/assets/quinoa-buddha-bowl.jpg";
import grilledChickenImg from "@/assets/grilled-chicken-salad.jpg";
import vegetableStirFryImg from "@/assets/vegetable-stir-fry.jpg";
import chocolateMousseImg from "@/assets/chocolate-avocado-mousse.jpg";
import herbSalmonImg from "@/assets/herb-crusted-salmon.jpg";
import { getRecipeOverrides, listRecipes } from "@/lib/api";

type DisplayRecipe = {
  title: string;
  image: string;
  description: string;
  cookTime: string;
  servings: number;
  tags: string[];
  ingredients: string[];
  instructions: string[];
};

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [recipe, setRecipe] = useState<DisplayRecipe | null>(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [missingIngredients, setMissingIngredients] = useState<string[]>([]);

  const sampleRecipes = useMemo<Record<string, DisplayRecipe>>(
    () => ({
      "sample-1": {
        title: "Creamy Pasta Carbonara",
        image: pastaCarbonaraImg,
        description: "A classic Italian pasta dish with eggs, cheese, and black pepper.",
        cookTime: "25 min",
        servings: 4,
        tags: ["Non-Vegetarian", "Dairy-Free"],
        ingredients: ["400g spaghetti", "200g pancetta", "4 eggs", "100g parmesan"],
        instructions: ["Boil pasta", "Cook pancetta", "Mix eggs and cheese", "Combine and serve"],
      },
      "sample-2": {
        title: "Quinoa Buddha Bowl",
        image: quinoaBuddhaImg,
        description: "Healthy bowl packed with grains and vegetables.",
        cookTime: "15 min",
        servings: 2,
        tags: ["Vegan", "Gluten-Free"],
        ingredients: ["1 cup quinoa", "mixed veggies", "olive oil"],
        instructions: ["Cook quinoa", "Prepare vegetables", "Assemble and serve"],
      },
      "sample-3": {
        title: "Grilled Chicken Salad",
        image: grilledChickenImg,
        description: "Fresh salad topped with grilled chicken.",
        cookTime: "30 min",
        servings: 3,
        tags: ["Non-Vegetarian", "Keto"],
        ingredients: ["Chicken breast", "lettuce", "tomatoes", "dressing"],
        instructions: ["Grill chicken", "Chop vegetables", "Mix and serve"],
      },
      "sample-4": {
        title: "Vegetable Stir Fry",
        image: vegetableStirFryImg,
        description: "Quick veggie stir fry for weeknight dinners.",
        cookTime: "20 min",
        servings: 2,
        tags: ["Vegetarian", "Vegan"],
        ingredients: ["Mixed vegetables", "soy sauce", "garlic", "oil"],
        instructions: ["Heat oil", "Stir fry vegetables", "Season and serve"],
      },
      "sample-5": {
        title: "Chocolate Avocado Mousse",
        image: chocolateMousseImg,
        description: "Rich and creamy dairy-free dessert.",
        cookTime: "10 min",
        servings: 4,
        tags: ["Vegan", "Dairy-Free"],
        ingredients: ["Avocado", "cocoa powder", "maple syrup"],
        instructions: ["Blend all ingredients", "Chill", "Serve"],
      },
      "sample-6": {
        title: "Herb-Crusted Salmon",
        image: herbSalmonImg,
        description: "Oven-baked salmon with fresh herbs.",
        cookTime: "35 min",
        servings: 2,
        tags: ["Non-Vegetarian", "Keto"],
        ingredients: ["Salmon fillets", "herbs", "lemon", "olive oil"],
        instructions: ["Season salmon", "Bake until done", "Serve warm"],
      },
    }),
    []
  );

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;

      if (id.startsWith("sample-")) {
        setRecipe(sampleRecipes[id] ?? null);
        return;
      }

      if (!id.startsWith("created-")) {
        setRecipe(null);
        return;
      }

      const createdId = Number.parseInt(id.replace("created-", ""), 10);
      if (Number.isNaN(createdId)) {
        setRecipe(null);
        return;
      }

      try {
        const recipes = await listRecipes();
        const baseRecipe = recipes.find((r) => r.id === createdId);
        if (!baseRecipe) {
          setRecipe(null);
          return;
        }

        const overrides = getRecipeOverrides();
        const override = overrides[String(createdId)] ?? {};
        const tags = override.tags ?? baseRecipe.tags;
        const fallbackImage = recipeCardsFallbackImage(tags || []);
        setRecipe({
          title: override.title ?? baseRecipe.title,
          image: override.image_url || baseRecipe.image_url || fallbackImage,
          description: override.description ?? baseRecipe.description ?? "No description provided.",
          cookTime: override.cook_time ?? baseRecipe.cook_time ?? "N/A",
          servings: override.servings ?? baseRecipe.servings,
          tags: tags && tags.length > 0 ? tags : ["Custom"],
          ingredients: override.ingredients ?? baseRecipe.ingredients,
          instructions: override.instructions ?? baseRecipe.instructions,
        });
      } catch {
        setRecipe(null);
      }
    };

    void loadRecipe();
  }, [id, sampleRecipes]);

  const handleIngredientCheck = (index: number, checked: boolean) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = checked;
    setCheckedIngredients(newChecked);
  };

  const orderMissingIngredients = () => {
    if (!recipe) return;
    const items = recipe.ingredients.filter((_, index) => !checkedIngredients[index]);
    if (items.length === 0) {
      toast({
        title: "All ingredients checked!",
        description: "You have all ingredients needed for this recipe",
      });
    } else {
      setMissingIngredients(items);
      setIsOrderDialogOpen(true);
    }
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/home">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <p className="mt-6 text-muted-foreground">Recipe not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center p-4 max-w-7xl mx-auto">
          <Link to="/home" className="flex items-center space-x-3 text-foreground hover:text-primary">
            <ArrowLeft className="h-6 w-6" />
            <h1 className="text-2xl font-bold text-primary">{recipe.title}</h1>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Main Recipe Display */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8 bg-card rounded-lg shadow-sm p-6">
          {/* Recipe Image */}
          <div className="relative">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>

          {/* Recipe Info */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-lg leading-relaxed">{recipe.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant={tag === "Non-Veg" ? "destructive" : tag === "Easy" ? "secondary" : "outline"}>
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Total Time</div>
                  <div className="font-medium">{recipe.cookTime}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">Servings</div>
                  <div className="font-medium">{recipe.servings}</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Ingredients and Instructions */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl">Ingredients</CardTitle>
              <Button 
                onClick={orderMissingIngredients}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Order Missing
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Checkbox
                      id={`ingredient-${index}`}
                      checked={checkedIngredients[index] || false}
                      onCheckedChange={(checked) => handleIngredientCheck(index, checked as boolean)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={`ingredient-${index}`}
                      className={`text-sm cursor-pointer leading-relaxed ${
                        checkedIngredients[index] ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {ingredient}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Missing Ingredients</DialogTitle>
            <DialogDescription>
              Choose where to buy each ingredient. Click any option to open that store search.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {missingIngredients.map((ingredient) => (
              <div key={ingredient} className="rounded-lg border p-3">
                <p className="font-medium mb-3">{ingredient}</p>
                <div className="flex flex-wrap gap-2">
                  {getStoreLinks(ingredient).map((store) => (
                    <a
                      key={`${ingredient}-${store.name}`}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        {ingredient} - {store.name}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipeDetail;

function recipeCardsFallbackImage(tags: string[]) {
  if (tags.includes("Non-Vegetarian")) return grilledChickenImg;
  if (tags.includes("Vegan")) return quinoaBuddhaImg;
  if (tags.includes("Vegetarian")) return vegetableStirFryImg;
  if (tags.includes("Keto")) return herbSalmonImg;
  return pastaCarbonaraImg;
}

function getStoreLinks(ingredient: string) {
  const query = encodeURIComponent(ingredient);
  return [
    { name: "Blinkit", url: `https://blinkit.com/s/?q=${query}` },
    { name: "Flipkart Minutes", url: `https://www.flipkart.com/search?q=${query}` },
    { name: "Amazon Fresh", url: `https://www.amazon.in/s?k=${query}` },
  ];
}
