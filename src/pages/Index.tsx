import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChefHat, Users, BookOpen, Star } from "lucide-react";
import heroImage from "@/assets/hero-meals.jpg";
import recipeCards from "@/assets/recipe-cards.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-white">CuisineCanvas</span>
        </div>
        <nav className="flex space-x-4">
          <Link to="/about">
            <Button variant="ghost" size="sm">About Us</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm" className="bg-gradient-hero hover:shadow-warm transition-all duration-300">
              Sign Up
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-6xl font-bold text-white mb-6">
            Discover Amazing Recipes
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create, share, and explore delicious recipes from around the world. 
            Your culinary journey starts here.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-4">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="text-black border-white hover:bg-white hover:text-black text-lg px-8 py-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CuisineCanvas?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to discover, create, and share amazing recipes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Vast Recipe Collection</h3>
                <p className="text-muted-foreground">
                  Access thousands of recipes for every diet and occasion
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
                <p className="text-muted-foreground">
                  Share your recipes and discover favorites from fellow food lovers
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Personalized Experience</h3>
                <p className="text-muted-foreground">
                  Filter by dietary preferences and save your favorite recipes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recipe Showcase */}
      <section className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Recipes</h2>
            <p className="text-muted-foreground text-lg">
              Explore some of our most popular and delicious recipes
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-warm">
            <img 
              src={recipeCards} 
              alt="Featured recipes showcase" 
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
                  Explore All Recipes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">CuisineCanvas</span>
          </div>
          <p className="text-background/80 mb-8">
            Your ultimate destination for culinary inspiration and recipe sharing
          </p>
          <div className="space-x-6">
            <Link to="/about" className="text-background/80 hover:text-background transition-colors">
              About Us
            </Link>
            <Link to="/signup" className="text-background/80 hover:text-background transition-colors">
              Join Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;