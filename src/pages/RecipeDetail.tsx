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
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <Link to="/home" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Recipes</span>
          </Link>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Recipe Detail</span>
          </div>
          <Button
            variant={isFavorited ? "default" : "outline"}
            onClick={toggleFavorite}
            className={isFavorited ? "bg-primary" : ""}
          >
            <Heart className={`h-4 w-4 mr-2 ${isFavorited ? "fill-current" : ""}`} />
            {isFavorited ? "Favorited" : "Favorite"}
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recipe Header */}
            <Card className="shadow-card">
              <div className="relative h-64 md:h-80">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl md:text-3xl">{recipe.title}</CardTitle>
                    <p className="text-muted-foreground mt-2">{recipe.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-warning fill-current" />
                      {recipe.rating} ({recipe.totalReviews} reviews)
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Instructions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-relaxed pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ingredients */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <Button 
                  onClick={orderMissingIngredients}
                  className="bg-accent hover:bg-accent/90"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Order Missing Items
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox
                        id={`ingredient-${index}`}
                        checked={checkedIngredients[index] || false}
                        onCheckedChange={(checked) => handleIngredientCheck(index, checked as boolean)}
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className={`text-sm cursor-pointer ${
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
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="shadow-card mt-8">
          <CardHeader>
            <CardTitle>Reviews ({recipe.totalReviews})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-3">Add Your Review</h4>
              
              <div className="flex items-center mb-3">
                <span className="text-sm mr-3">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? "text-warning" : "text-muted-foreground"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              
              <Textarea
                placeholder="Share your experience with this recipe..."
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                rows={3}
                className="mb-3"
              />
              
              <Button type="submit" size="sm">
                Submit Review
              </Button>
            </form>

            {/* Existing Reviews */}
            <div className="space-y-4">
              {recipe.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-medium">{review.user}</span>
                      <div className="flex items-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-sm ${
                              star <= review.rating ? "text-warning" : "text-muted-foreground"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetail;
