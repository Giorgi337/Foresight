/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-foresight-orange/30 selection:text-foresight-navy">
      <Navbar />
      <Hero />
      <Dashboard />

      <footer className="bg-foresight-navy text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foresight-orange rounded-full flex items-center justify-center">
              <span className="text-foresight-navy font-bold text-xs">F</span>
            </div>
            <span className="font-bold tracking-tight text-lg">
              FORESIGHT
            </span>
          </div>
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Foresight Financial. Internal Dashboard.
          </p>
        </div>
      </footer>
    </div>
  );
}
