
// Copyright © 2025 Rawat Innovations Private Limited. All rights reserved.

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Users, Calendar, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <img src={logo} alt="Nearby Connect Logo" className="h-8 w-8" />
          <span className="font-bold text-lg">Nearby Connect</span>
        </Link>
        
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6 flex-1 justify-center">
          <Link to="/discover" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Discover</span>
          </Link>
          <Link to="/community" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
            <Users className="h-4 w-4 mr-1" />
            <span>Community</span>
          </Link>
          <Link to="/events" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Events</span>
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
