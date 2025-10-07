// Copyright © 2025 Rawat Innovations Private Limited. All rights reserved.

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Users, Calendar, User } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import logo from '@/assets/logo.svg';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 sm:h-16 items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 mr-2 sm:mr-4">
          <img src={logo} alt="Nearby Connect Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
          <span className="font-bold text-base sm:text-lg">Nearby Connect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6 flex-1 justify-center">
          <Link
            to="/discover"
            className="flex items-center text-sm font-medium transition-colors hover:text-primary"
          >
            <MapPin className="h-4 w-4 mr-1" />
            <span>Discover</span>
          </Link>
          <Link
            to="/community"
            className="flex items-center text-sm font-medium transition-colors hover:text-primary"
          >
            <Users className="h-4 w-4 mr-1" />
            <span>Community</span>
          </Link>
          <Link
            to="/events"
            className="flex items-center text-sm font-medium transition-colors hover:text-primary"
          >
            <Calendar className="h-4 w-4 mr-1" />
            <span>Events</span>
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2 ml-auto">
          <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
            <Search className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <User className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t bg-background/95 backdrop-blur">
        <div className="container px-4 py-2">
          <div className="flex justify-around">
            <Link
              to="/discover"
              className="flex flex-col items-center text-xs font-medium transition-colors hover:text-primary py-1"
            >
              <MapPin className="h-4 w-4 mb-1" />
              <span>Discover</span>
            </Link>
            <Link
              to="/community"
              className="flex flex-col items-center text-xs font-medium transition-colors hover:text-primary py-1"
            >
              <Users className="h-4 w-4 mb-1" />
              <span>Community</span>
            </Link>
            <Link
              to="/events"
              className="flex flex-col items-center text-xs font-medium transition-colors hover:text-primary py-1"
            >
              <Calendar className="h-4 w-4 mb-1" />
              <span>Events</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
