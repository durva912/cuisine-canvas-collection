import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Plus, 
  ChefHat, 
  Settings, 
  User, 
  Heart, 
  Clock,
  Users
} from "lucide-react";
import pastaCarbonaraImg from "@/assets/pasta-carbonara.jpg";
import quinoaBuddhaImg from "@/assets/quinoa-buddha-bowl.jpg";
import grilledChickenImg from "@/assets/grilled-chicken-salad.jpg";
import vegetableStirFryImg from "@/assets/vegetable-stir-fry.jpg";
import chocolateMousseImg from "@/assets/chocolate-avocado-mousse.jpg";
import herbSalmonImg from "@/assets/herb-crusted-salmon.jpg";
import {
  getFavoriteRecipes,
  getRecipeOverrides,
  listRecipes,
  saveFavoriteRecipes,
  type FavoriteRecipe,
  type Recipe as ApiRecipe,
} from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [createdRecipes, setCreatedRecipes] = useState<ApiRecipe[]>([]);
  const { toast } = useToast();

  const dietFilters = [
    "Vegetarian", "Non-Vegetarian", "Vegan", "Keto", 
    "Egg-Free", "Dairy-Free", "Gluten-Free"
  ];

  const sampleRecipes = [
    {
      id: 1,
      title: "Creamy Pasta Carbonara",
      image: pastaCarbonaraImg,
      time: "25 min",
      servings: 4,
      tags: ["Non-Vegetarian", "Dairy-Free"],
      rating: 4.8
    },
    {
      id: 2,
      title: "Quinoa Buddha Bowl",
      image: quinoaBuddhaImg,
      time: "15 min",
      servings: 2,
      tags: ["Vegan", "Gluten-Free"],
      rating: 4.6
    },
    {
      id: 3,
      title: "Grilled Chicken Salad",
      image: grilledChickenImg,
      time: "30 min",
      servings: 3,
      tags: ["Non-Vegetarian", "Keto"],
      rating: 4.7
    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      image: vegetableStirFryImg,
      time: "20 min",
      servings: 2,
      tags: ["Vegetarian", "Vegan"],
      rating: 4.5
    },
    {
      id: 5,
      title: "Chocolate Avocado Mousse",
      image: chocolateMousseImg,
      time: "10 min",
      servings: 4,
      tags: ["Vegan", "Dairy-Free"],
      rating: 4.9
    },
    {
      id: 6,
      title: "Herb-Crusted Salmon",
      image: herbSalmonImg,
      time: "35 min",
      servings: 2,
      tags: ["Non-Vegetarian", "Keto"],
      rating: 4.8
    }
  ];

  useEffect(() => {
    setFavorites(getFavoriteRecipes().map((recipe) => recipe.id));
  }, []);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await listRecipes();
        setCreatedRecipes(recipes);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load recipes";
        toast({
          title: "Could not load recipes",
          description: message,
          variant: "destructive",
        });
      }
    };
    void loadRecipes();
  }, [toast]);

  const createdRecipeCards = useMemo(
    () => {
      const overrides = getRecipeOverrides();
      return createdRecipes.map((recipe) => {
        const override = overrides[String(recipe.id)] ?? {};
        const tags = override.tags ?? recipe.tags;
        return {
          id: `created-${recipe.id}`,
          title: override.title ?? recipe.title,
          image: override.image_url || recipe.image_url || recipeCardsFallbackImage(tags || []),
          time: override.cook_time ?? recipe.cook_time ?? "N/A",
          servings: override.servings ?? recipe.servings,
          tags: tags && tags.length > 0 ? tags : ["Custom"],
          rating: recipe.rating,
        };
      });
    },
    [createdRecipes]
  );

  const allRecipes = useMemo(
    () => [
      ...createdRecipeCards,
      ...sampleRecipes.map((recipe) => ({ ...recipe, id: `sample-${recipe.id}` })),
    ],
    [createdRecipeCards, sampleRecipes]
  );

  const filteredRecipes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allRecipes.filter((recipe) => {
      const matchesSearch = q.length === 0 || recipe.title.toLowerCase().includes(q);
      const matchesFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => recipe.tags.includes(filter));
      return matchesSearch && matchesFilters;
    });
  }, [allRecipes, searchQuery, selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const toggleFavorite = (recipe: FavoriteRecipe) => {
    const existingFavorites = getFavoriteRecipes();
    const isAlreadyFavorite = existingFavorites.some((item) => item.id === recipe.id);
    const updatedFavorites = isAlreadyFavorite
      ? existingFavorites.filter((item) => item.id !== recipe.id)
      : [recipe, ...existingFavorites];
    saveFavoriteRecipes(updatedFavorites);
    setFavorites(updatedFavorites.map((item) => item.id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CuisineCanvas</span>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link to="/favorites">
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Create Recipe Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Link to="/create-recipe">
              <Button className="bg-gradient-hero hover:shadow-warm transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Create Recipe
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Diet Filters:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dietFilters.map((filter) => (
              <Badge
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedFilters.includes(filter) 
                    ? "bg-primary hover:bg-primary/90" 
                    : "hover:bg-muted"
                }`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
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
                  onClick={() =>
                    toggleFavorite({
                      id: recipe.id,
                      title: recipe.title,
                      image: recipe.image,
                      time: recipe.time,
                      servings: recipe.servings,
                      tags: recipe.tags,
                      rating: recipe.rating,
                    })
                  }
                  className={`absolute top-2 right-2 transition-colors ${
                    favorites.includes(recipe.id) 
                      ? "bg-destructive/10 hover:bg-destructive/20 text-destructive" 
                      : "bg-white/80 hover:bg-white"
                  }`}
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.includes(recipe.id) ? 'fill-destructive' : ''}`} 
                  />
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
                
                <Link to={`/recipe/${recipe.id}`}>
                  <Button className="w-full" variant="outline">
                    View Recipe
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

function recipeCardsFallbackImage(tags: string[]) {
  if (tags.includes("Non-Vegetarian")) return grilledChickenImg;
  if (tags.includes("Vegan")) return quinoaBuddhaImg;
  if (tags.includes("Vegetarian")) return vegetableStirFryImg;
  return pastaCarbonaraImg;
}

export default Home;