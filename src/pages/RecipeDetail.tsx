import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Clock, 
  Users, 
  Star,
  ChefHat,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecipeDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFavorited, setIsFavorited] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);

  // Sample recipe data
  const recipe = {
    id: 1,
    title: "Creamy Pasta Carbonara",
    image: "/api/placeholder/600/400",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. Simple ingredients come together to create this rich and satisfying meal.",
    cookTime: "25 min",
    servings: 4,
    tags: ["Non-Vegetarian", "Italian"],
    rating: 4.8,
    totalReviews: 124,
    ingredients: [
      "400g spaghetti pasta",
      "200g pancetta or bacon, diced",
      "4 large eggs",
      "100g Parmesan cheese, grated",
      "2 cloves garlic, minced",
      "Fresh black pepper",
      "Salt to taste",
      "2 tbsp olive oil"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions until al dente.",
      "While pasta cooks, heat olive oil in a large skillet over medium heat. Add pancetta and cook until crispy, about 5-7 minutes.",
      "Add minced garlic to the skillet and cook for another minute until fragrant.",
      "In a bowl, whisk together eggs, grated Parmesan, and a generous amount of black pepper.",
      "Drain pasta, reserving 1 cup of pasta water. Add hot pasta to the skillet with pancetta.",
      "Remove from heat and quickly stir in the egg mixture, adding pasta water gradually to create a creamy sauce.",
      "Serve immediately with extra Parmesan and black pepper."
    ],
    reviews: [
      {
        id: 1,
        user: "Maria K.",
        rating: 5,
        comment: "Perfect recipe! The carbonara turned out creamy and delicious.",
        date: "2 days ago"
      },
      {
        id: 2,
        user: "John D.",
        rating: 4,
        comment: "Great instructions, very easy to follow. Will make again!",
        date: "1 week ago"
      }
    ]
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast({
      title: isFavorited ? "Removed from favorites" : "Added to favorites",
      description: isFavorited ? "Recipe removed from your favorites" : "Recipe saved to your favorites",
    });
  };

  const handleIngredientCheck = (index: number, checked: boolean) => {
    const newChecked = [...checkedIngredients];
    newChecked[index] = checked;
    setCheckedIngredients(newChecked);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim() || rating === 0) {
      toast({
        title: "Error",
        description: "Please provide a rating and review",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback",
    });
    
    setNewReview("");
    setRating(0);
  };

  const orderMissingIngredients = () => {
    const missingIngredients = recipe.ingredients.filter((_, index) => !checkedIngredients[index]);
    if (missingIngredients.length === 0) {
      toast({
        title: "All ingredients checked!",
        description: "You have all ingredients needed for this recipe",
      });
    } else {
      toast({
        title: "Redirecting to ONTC",
        description: `Ordering ${missingIngredients.length} missing ingredients`,
      });
    }
  };

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

            <div className="flex items-center space-x-1 pt-2">
              <Star className="h-5 w-5 text-warning fill-current" />
              <span className="font-medium text-lg">{recipe.rating}</span>
              <span className="text-muted-foreground">rating</span>
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
    </div>
  );
};

export default RecipeDetail;
