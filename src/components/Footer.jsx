export default function Footer() {
  return (
    <footer className="mt-20 px-4 sm:px-6 lg:px-8 pb-12">
      <div className="max-w-7xl mx-auto bg-black text-white rounded-[40px] p-8 md:p-12 shadow-brutal-lg border-2 border-black overflow-hidden relative">
        {/* Decorative Pop Circle */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brutal-blue rounded-full opacity-20 blur-3xl" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white border-2 border-white rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_#818cf8]">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter italic">BillGen</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">
              High-performance bill generator for IUB. Designed for speed, precision, and modern academics.
            </p>
          </div>
          
          <div className="md:text-right">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Lead Developer</p>
            <p className="text-3xl font-black text-brutal-blue uppercase tracking-tighter leading-none mb-4">Momotaj Akther Happy</p>
            <div className="flex flex-col md:items-end gap-1 text-[10px] text-gray-400 font-black uppercase tracking-widest">
              <span>Computer Science & Engineering</span>
              <span>IUB Digital Labs</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
          <p className="text-gray-500">© 2026 Independent University, Bangladesh</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brutal-blue transition-colors">Documentation</a>
            <a href="#" className="hover:text-brutal-blue transition-colors">Privacy</a>
            <a href="#" className="hover:text-brutal-blue transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
