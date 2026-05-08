import { useState, useRef, useEffect } from 'react';

export default function Select({ label, options, value, onChange, icon: Icon, placeholder = "Select option..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt.label === value);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-app-surface border-2 border-black/10 dark:border-white/10 rounded-xl px-5 py-3.5 text-sm text-left
            transition-all duration-300 outline-none flex items-center justify-between font-medium text-app-text
            focus:border-black dark:focus:border-retro-sage focus:shadow-retro dark:focus:shadow-none
            ${isOpen ? 'border-black dark:border-retro-sage bg-app-surface shadow-retro dark:shadow-none' : ''}
          `}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {Icon && <span className="text-gray-400 dark:text-gray-500"><Icon size={16} strokeWidth={2} /></span>}
            <span className={`truncate ${!value ? 'text-gray-300 dark:text-gray-600' : 'text-app-text'}`}>
              {selectedOption ? selectedOption.label : value || placeholder}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black dark:text-retro-sage' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-app-surface border-2 border-black dark:border-white/10 rounded-xl shadow-retro-lg dark:shadow-2xl py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-300">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-5 py-3 text-sm text-left transition-colors font-semibold
                  hover:bg-retro-blue dark:hover:bg-retro-sage hover:text-white
                  ${value === option.value ? 'bg-retro-blue/10 dark:bg-retro-sage/20 text-retro-blue dark:text-retro-sage' : 'text-app-text'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
