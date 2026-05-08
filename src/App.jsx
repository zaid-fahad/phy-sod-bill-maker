import { useState } from 'react';
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

  if (isUnsupportedBrowser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unsupported Browser</h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            You are currently using the <span className="font-bold text-blue-600">Facebook/Messenger</span> in-app browser. 
            For security and technical reasons, PDF generation is not supported here.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 text-left">
            <p className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              How to fix this:
            </p>
            <ol className="text-sm text-blue-700 space-y-2 ml-4 list-decimal font-medium">
              <li>Tap the <span className="font-bold text-lg leading-none">...</span> (three dots) in the top-right corner.</li>
              <li>Select <span className="font-bold underline italic">"Open in Browser"</span> or <span className="font-bold underline italic">"Open in Chrome/Safari"</span>.</li>
            </ol>
          </div>

          <p className="text-xs text-gray-400 italic">
            Once opened in a standard browser, your bill will be ready to download!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Home />
    </div>
  );
}

export default App;
