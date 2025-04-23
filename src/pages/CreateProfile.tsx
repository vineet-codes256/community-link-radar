
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/use-auth";

const CreateProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      toast({ title: "Error", description: "User not logged in." });
      setLoading(false);
      return;
    }

    // Save to profiles
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username: location, // Using username field for location for now since table only has full_name, username (adapt as needed).
        avatar_url: "",
      })
      .eq("id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message });
    } else {
      toast({ title: "Profile created!", description: "Welcome to Nearby Connect." });
      navigate("/", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
            <Input
              type="text"
              placeholder="Location (e.g. Koramangala, Bengaluru)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={loading}
            />
            <Textarea
              placeholder="About you (a little intro, interests, etc.)"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              disabled={loading}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfile;

