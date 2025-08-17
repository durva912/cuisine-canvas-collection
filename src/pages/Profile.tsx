import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    sex: "male",
    birthYear: "1990"
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated!",
      description: "Your profile information has been saved successfully.",
    });
  };

  const currentYear = new Date().getFullYear();
  const birthYears = Array.from({ length: 80 }, (_, i) => currentYear - i - 16);

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

              {/* Sex */}
              <div className="space-y-2">
                <Label htmlFor="sex">Sex</Label>
                <Select 
                  value={profileData.sex} 
                  onValueChange={(value) => handleInputChange('sex', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Birth Year */}
              <div className="space-y-2">
                <Label htmlFor="birthYear">Birth Year</Label>
                <Select 
                  value={profileData.birthYear} 
                  onValueChange={(value) => handleInputChange('birthYear', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your birth year" />
                  </SelectTrigger>
                  <SelectContent>
                    {birthYears.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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