
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type UserProfile = {
  id: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  interests?: string[];
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Subscribe to auth state first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // If user is logged in, fetch their profile
        if (session?.user) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          setProfile(data || null);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );
    
    // Then check for current session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      // If user is logged in, fetch their profile
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
          
        setProfile(data || null);
      }
      
      setLoading(false);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading, profile };
}
