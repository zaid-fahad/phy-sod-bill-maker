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
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-left
            transition-all duration-200 outline-none flex items-center justify-between
            focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50
            ${isOpen ? 'border-blue-600 ring-4 ring-blue-50/50' : ''}
          `}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {Icon && <span className="text-gray-400"><Icon size={18} /></span>}
            <span className={`truncate ${!value ? 'text-gray-400' : 'text-gray-900'}`}>
              {selectedOption ? selectedOption.label : value || placeholder}
            </span>
          </div>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-2 text-sm text-left transition-colors
                  hover:bg-blue-50 hover:text-blue-600
                  ${value === option.value ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'}
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
