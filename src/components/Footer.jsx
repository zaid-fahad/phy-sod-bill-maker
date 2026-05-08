export default function Footer() {
  return (
    <footer className="mt-20 px-6 sm:px-8 pb-12">
      <div className="max-w-7xl mx-auto bg-black dark:bg-app-surface text-white rounded-[3rem] p-10 md:p-16 shadow-retro-lg border-2 border-black dark:border-white/10 overflow-hidden relative">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-retro-sage rounded-full opacity-10 blur-3xl" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-white dark:bg-retro-sage rounded-2xl flex items-center justify-center shadow-retro-sm">
                <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl font-black  tracking-tighter italic">SoD BillGen</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs leading-relaxed font-medium">
              SoD Bill Generator            </p>
          </div>
          
          <div className="md:text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3">Made By:</p>
            <p className="text-3xl font-black text-white dark:text-retro-sage uppercase tracking-tighter leading-none mb-6">Momotaj Akther Happy</p>
            <div className="flex flex-col md:items-end gap-1.5 text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                            <span>ID: 2430798</span>

              <span>Computer Science & Engineering</span>
              <span className="opacity-50">SETS, IUB</span>
            </div>
          </div>
        </div>
        
        {/* <div className="border-t border-white/5 dark:border-white/5 mt-16 pt-10 flex flex-col sm:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em]">
          <p className="text-gray-600">© 2026 IUB PHYSICAL SCIENCES</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-retro-sage transition-colors">Source</a>
            <a href="#" className="hover:text-retro-sage transition-colors">Privacy</a>
            <a href="#" className="hover:text-retro-sage transition-colors">Terms</a>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
