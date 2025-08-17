import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChefHat, ArrowLeft, Heart, Users, Target } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">CuisineCanvas</span>
        </div>
        <Link to="/signup">
          <Button className="bg-gradient-hero">Sign Up</Button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">About CuisineCanvas</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're passionate about bringing people together through food. Our platform 
            makes it easy to discover, create, and share recipes that inspire culinary 
            adventures around the world.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-muted-foreground">
                  To make cooking accessible, enjoyable, and inspiring for everyone, 
                  regardless of skill level or dietary preferences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community First</h3>
                <p className="text-muted-foreground">
                  We believe the best recipes come from real people sharing their 
                  passion for food with others who love to cook.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-card hover:shadow-warm transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Target className="h-12 w-12 text-warning mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform with features that make 
                  recipe discovery and meal planning effortless.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="mb-6">
              CuisineCanvas was born from a simple idea: cooking should be fun, not stressful. 
              Our founders, passionate home cooks themselves, noticed how difficult it could be 
              to find reliable recipes that matched specific dietary needs and preferences.
            </p>
            <p className="mb-6">
              We created a platform where food enthusiasts could not only discover amazing recipes 
              but also share their own culinary creations with a community that truly appreciates 
              good food. From quick weeknight dinners to elaborate holiday feasts, we believe 
              every recipe has a story worth sharing.
            </p>
            <p>
              Today, CuisineCanvas serves thousands of home cooks, professional chefs, and food 
              bloggers who use our platform to explore new flavors, perfect their techniques, 
              and connect with fellow food lovers around the world.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-hero text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join our community of food lovers and discover your next favorite recipe today.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              Join CuisineCanvas
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 px-6 text-center">
        <div className="flex items-center justify-center space-x-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="font-semibold">CuisineCanvas</span>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;