import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ChefHat, 
  Settings as SettingsIcon,
  LogOut,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clearAuth } from "@/lib/api";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [preferences, setPreferences] = useState({
    dietType: ["Vegetarian"],
    avoidances: ["Nuts"],
    dislikes: ["Spicy Food"],
    favoriteCuisines: ["Italian", "Mexican"]
  });

  const dietOptions = [
    "Vegetarian", "Non-Vegetarian", "Vegan", "Keto", 
    "Egg-Free", "Dairy-Free", "Gluten-Free"
  ];

  const avoidanceOptions = [
    "Nuts", "Shellfish", "Dairy", "Eggs", "Gluten", "Soy", "Fish"
  ];

  const dislikeOptions = [
    "Spicy Food", "Sweet Food", "Sour Food", "Very Salty", "Bitter", "Raw Food"
  ];

  const cuisineOptions = [
    "Italian", "Mexican", "Indian", "Chinese", "Japanese", "Thai", 
    "Mediterranean", "American", "French", "Korean"
  ];

  const togglePreference = (category: keyof typeof preferences, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleSave = () => {
    toast({
      title: "Preferences saved!",
      description: "Your dietary preferences have been updated.",
    });
  };

  const handleLogout = () => {
    clearAuth();
    toast({
      title: "Logged out successfully",
      description: "Redirecting to sign in...",
    });
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link to="/home" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Settings</span>
          </div>
          <div></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <ChefHat className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Diet Type Preferences */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Diet Type</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select your dietary preferences to get personalized recipe recommendations
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dietOptions.map((diet) => (
                    <Badge
                      key={diet}
                      variant={preferences.dietType.includes(diet) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        preferences.dietType.includes(diet) 
                          ? "bg-primary hover:bg-primary/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => togglePreference('dietType', diet)}
                    >
                      {diet}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Avoidances */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Avoidances</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select ingredients or allergens you want to avoid
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {avoidanceOptions.map((avoidance) => (
                    <Badge
                      key={avoidance}
                      variant={preferences.avoidances.includes(avoidance) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        preferences.avoidances.includes(avoidance) 
                          ? "bg-destructive hover:bg-destructive/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => togglePreference('avoidances', avoidance)}
                    >
                      {avoidance}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dislikes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Dislikes</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select food types or flavors you don't enjoy
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {dislikeOptions.map((dislike) => (
                    <Badge
                      key={dislike}
                      variant={preferences.dislikes.includes(dislike) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        preferences.dislikes.includes(dislike) 
                          ? "bg-warning hover:bg-warning/90 text-white" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => togglePreference('dislikes', dislike)}
                    >
                      {dislike}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Favorite Cuisines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Favorite Cuisines</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Select cuisines you love to get more relevant recommendations
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {cuisineOptions.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={preferences.favoriteCuisines.includes(cuisine) ? "default" : "outline"}
                      className={`cursor-pointer transition-colors ${
                        preferences.favoriteCuisines.includes(cuisine) 
                          ? "bg-accent hover:bg-accent/90" 
                          : "hover:bg-muted"
                      }`}
                      onClick={() => togglePreference('favoriteCuisines', cuisine)}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-gradient-hero hover:shadow-warm transition-all duration-300"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;