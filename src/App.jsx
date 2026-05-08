import { useState, useEffect } from 'react';
import Home from './pages/Home';

const checkIsUnsupportedBrowser = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isFacebook = ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
  const isMessenger = ua.indexOf("Messenger") > -1;
  return isFacebook || isMessenger;
};

function App() {
  const [isUnsupportedBrowser] = useState(checkIsUnsupportedBrowser());
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  if (isUnsupportedBrowser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unsupported Browser</h1>
          <p className="text-gray-600 mb-8">Please open this site in Chrome or Safari for PDF generation support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-paper text-app-text font-sans transition-colors duration-500">
      <Home toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
    </div>
  );
}

export default App;
