export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white border-2 border-black rounded-[2.5rem] shadow-retro-lg overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-xl text-black uppercase tracking-[0.1em]">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-black"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
