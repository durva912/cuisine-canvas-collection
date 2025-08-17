import { useState } from "react";
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

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const dietFilters = [
    "Vegetarian", "Non-Vegetarian", "Vegan", "Keto", 
    "Egg-Free", "Dairy-Free", "Gluten-Free"
  ];

  const sampleRecipes = [
    {
      id: 1,
      title: "Creamy Pasta Carbonara",
      image: "/api/placeholder/300/200",
      time: "25 min",
      servings: 4,
      tags: ["Non-Vegetarian", "Dairy-Free"],
      rating: 4.8
    },
    {
      id: 2,
      title: "Quinoa Buddha Bowl",
      image: "/api/placeholder/300/200",
      time: "15 min",
      servings: 2,
      tags: ["Vegan", "Gluten-Free"],
      rating: 4.6
    },
    {
      id: 3,
      title: "Grilled Chicken Salad",
      image: "/api/placeholder/300/200",
      time: "30 min",
      servings: 3,
      tags: ["Non-Vegetarian", "Keto"],
      rating: 4.7
    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      image: "/api/placeholder/300/200",
      time: "20 min",
      servings: 2,
      tags: ["Vegetarian", "Vegan"],
      rating: 4.5
    },
    {
      id: 5,
      title: "Chocolate Avocado Mousse",
      image: "/api/placeholder/300/200",
      time: "10 min",
      servings: 4,
      tags: ["Vegan", "Dairy-Free"],
      rating: 4.9
    },
    {
      id: 6,
      title: "Herb-Crusted Salmon",
      image: "/api/placeholder/300/200",
      time: "35 min",
      servings: 2,
      tags: ["Non-Vegetarian", "Keto"],
      rating: 4.8
    }
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
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
          {sampleRecipes.map((recipe) => (
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
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
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

export default Home;