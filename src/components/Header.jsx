export default function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-6 pb-2 bg-app-paper/80 backdrop-blur-xl border-b border-app-border transition-all duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20 px-4 sm:px-8 bg-app-surface border-2 border-black/10 dark:border-white/10 rounded-[2rem] shadow-retro dark:shadow-none transition-all hover:shadow-black/10">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black dark:bg-retro-sage rounded-2xl flex items-center justify-center shadow-retro-sm">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-app-text leading-none tracking-tighter uppercase italic">BillGen</h1>
              <p className="hidden sm:block text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-2">IUB Digital Systems</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-8">
            {/* <div className="hidden md:block text-right border-r-2 border-app-border pr-8">
              <p className="text-[11px] font-black text-app-text uppercase tracking-[0.15em] mb-1 leading-tight">Physical Sciences</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Engineering & Tech</p>
            </div> */}

            <button 
              onClick={toggleDarkMode}
              className="w-12 h-12 rounded-2xl bg-app-paper border-2 border-app-border flex items-center justify-center text-app-text hover:border-black dark:hover:border-retro-sage transition-all active:scale-95 shadow-sm"
              aria-label="Toggle Theme"
            >
              {darkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
