import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Search, 
  Clock, 
  Users,
  ChefHat,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getFavoriteRecipes, saveFavoriteRecipes, type FavoriteRecipe } from "@/lib/api";

const Favorites = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipes());
  }, []);

  const removeFavorite = (recipeId: string) => {
    const updated = favoriteRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoriteRecipes(updated);
    saveFavoriteRecipes(updated);
    toast({
      title: "Removed from favorites",
      description: "Recipe has been removed from your favorites list",
    });
  };

  const filteredRecipes = useMemo(
    () =>
      favoriteRecipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [favoriteRecipes, searchQuery]
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <Link to="/home" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary fill-current" />
            <span className="text-xl font-bold">My Favorites</span>
          </div>
          <div className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-primary" />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search your favorite recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">{favoriteRecipes.length}</div>
              <p className="text-muted-foreground">Favorite Recipes</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {Math.round(favoriteRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) / favoriteRecipes.length * 10) / 10 || 0}
              </div>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                {new Set(favoriteRecipes.flatMap(recipe => recipe.tags)).size}
              </div>
              <p className="text-muted-foreground">Different Cuisines</p>
            </CardContent>
          </Card>
        </div>

        {/* Favorites Grid */}
        {filteredRecipes.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {favoriteRecipes.length === 0 ? "No favorites yet" : "No recipes found"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {favoriteRecipes.length === 0 
                  ? "Start exploring recipes and add them to your favorites!" 
                  : "Try adjusting your search terms to find your favorite recipes."
                }
              </p>
              {favoriteRecipes.length === 0 && (
                <Link to="/home">
                  <Button className="bg-gradient-hero hover:shadow-warm transition-all duration-300">
                    Explore Recipes
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden shadow-card hover:shadow-warm transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-destructive hover:text-destructive"
                    onClick={() => removeFavorite(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {recipe.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {recipe.time}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {recipe.servings} servings
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-warning">★</span>
                      <span className="ml-1">{recipe.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/recipe/${recipe.id}`} className="flex-1">
                      <Button className="w-full" variant="outline">
                        View Recipe
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary-glow"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;