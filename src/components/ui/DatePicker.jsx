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
    // Padding for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, current: false });
    }
    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, current: true });
    }
    return days;
  }, [viewDate]);

  const handleDateSelect = (day) => {
    const selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const formatted = selected.toISOString().split('T')[0];
    onChange({ target: { name: '', value: formatted } }); // Emulate event for compatibility
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
            transition-all duration-200 outline-none flex items-center gap-3
            focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50
            ${isOpen ? 'border-blue-600 ring-4 ring-blue-50/50' : ''}
          `}
        >
          {Icon && <span className="text-gray-400 group-focus-within:text-blue-600"><Icon size={18} /></span>}
          <span className={`flex-1 truncate ${!value ? 'text-gray-400' : 'text-gray-900'}`}>
            {displayDate || placeholder}
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl p-4 w-72 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between mb-4">
              <button 
                onClick={() => changeMonth(-1)} 
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <h4 className="font-bold text-gray-900 text-sm">
                {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
              </h4>
              <button 
                onClick={() => changeMonth(1)} 
                className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {DAYS.map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
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
                    h-8 w-8 text-xs rounded-lg flex items-center justify-center transition-all
                    ${!d.day ? 'invisible' : 'hover:bg-blue-50 hover:text-blue-600'}
                    ${value === new Date(viewDate.getFullYear(), viewDate.getMonth(), d.day).toISOString().split('T')[0] 
                      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-100' 
                      : 'text-gray-700'}
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
