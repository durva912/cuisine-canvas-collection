import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStoredAuthUser, saveStoredAuthUser } from "@/lib/api";

const Profile = () => {
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const user = getStoredAuthUser();
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
      });
    }
    setIsLoaded(true);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = profileData.name.trim();
    const trimmedEmail = profileData.email.trim().toLowerCase();
    if (!trimmedName || !trimmedEmail) {
      toast({
        title: "Missing details",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    const existing = getStoredAuthUser();
    if (!existing) {
      toast({
        title: "Not signed in",
        description: "Please login again to save profile changes.",
        variant: "destructive",
      });
      return;
    }

    saveStoredAuthUser({
      ...existing,
      name: trimmedName,
      email: trimmedEmail,
    });

    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Link to="/settings" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Settings</span>
          </Link>
          <div className="flex items-center space-x-2">
            <User className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Profile</span>
          </div>
          <div></div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6">
        <Card className="shadow-card">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-2xl">My Profile</CardTitle>
            <p className="text-muted-foreground">
              Manage your personal information
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSave} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Link to="/settings">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  className="bg-gradient-hero hover:shadow-warm transition-all duration-300"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Profile Statistics */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <p className="text-sm text-muted-foreground">Recipes Created</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-accent mb-2">48</div>
              <p className="text-sm text-muted-foreground">Favorite Recipes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-card">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warning mb-2">4.8</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;