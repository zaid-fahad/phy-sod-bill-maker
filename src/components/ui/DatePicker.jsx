import { useState, useRef, useEffect, useMemo } from 'react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function DatePicker({ label, value, onChange, icon: Icon, placeholder = "Select date..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
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

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ day: null, current: false });
    for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, current: true });
    return days;
  }, [viewDate]);

  const handleDateSelect = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formatted = selected.toISOString().split('T')[0];
    onChange({ target: { name: '', value: formatted } });
    setIsOpen(false);
  };

  const changeMonth = (offset) => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
  };

  const displayDate = value ? new Date(value).toLocaleDateString('en-US', { 
    year: 'numeric', month: 'short', day: 'numeric' 
  }) : '';

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
            w-full bg-white dark:bg-white/5 border-2 border-black/10 dark:border-white/10 rounded-xl px-5 py-3.5 text-sm text-left
            transition-all duration-300 outline-none flex items-center gap-3 font-medium text-black dark:text-white
            focus:border-black dark:focus:border-retro-sage focus:bg-white dark:focus:bg-white/10 focus:shadow-retro dark:focus:shadow-none
            ${isOpen ? 'border-black dark:border-retro-sage bg-white dark:bg-white/10 shadow-retro dark:shadow-none' : ''}
          `}
        >
          {Icon && <span className="text-gray-400 dark:text-gray-500"><Icon size={16} strokeWidth={2} /></span>}
          <span className={`flex-1 truncate ${!value ? 'text-gray-300 dark:text-gray-600' : 'text-black dark:text-white'}`}>
            {displayDate || placeholder}
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white dark:bg-dark-surface border-2 border-black dark:border-white/10 rounded-2xl shadow-retro-lg dark:shadow-2xl p-5 w-72 animate-in fade-in slide-in-from-top-2 duration-300 text-black dark:text-white">
            <div className="flex items-center justify-between mb-5">
              <button 
                onClick={() => changeMonth(-1)} 
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h4 className="font-bold text-black dark:text-white text-xs uppercase tracking-widest">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h4>
              <button 
                onClick={() => changeMonth(1)} 
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {DAYS.map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-300 dark:text-gray-500 uppercase tracking-tighter">{d}</span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((d, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={!d.day}
                  onClick={() => handleDateSelect(d.day)}
                  className={`
                    h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all font-bold
                    ${!d.day ? 'invisible' : 'hover:bg-retro-blue/10 dark:hover:bg-retro-sage/10 hover:text-retro-blue dark:hover:text-retro-sage'}
                    ${value === new Date(viewDate.getFullYear(), viewDate.getMonth(), d.day).toISOString().split('T')[0] 
                      ? 'bg-black dark:bg-retro-sage text-white dark:text-black' 
                      : 'text-gray-700 dark:text-gray-300'}
                  `}
                >
                  {d.day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
