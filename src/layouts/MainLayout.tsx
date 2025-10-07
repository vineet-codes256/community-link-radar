import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-gray-50 dark:bg-gray-900 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Nearby Connect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Discover and connect with people nearby who share your interests. Find meaningful
                connections in your local community.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/discover"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Discover People
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Join Community
                  </Link>
                </li>
                <li>
                  <Link
                    to="/events"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Local Events
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/auth"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create-profile"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Create Profile
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.karmicinnovations.com/"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.karmicinnovations.com/privacy"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.karmicinnovations.com/terms"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© 2025 Rawat Innovations Private Limited. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ for meaningful connections in your community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
