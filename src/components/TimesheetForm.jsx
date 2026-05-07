// src/components/TimesheetForm.jsx
import { useMemo, useEffect, useRef } from 'react';

// 1. Built-in SVG Icons
const IconPlus = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const IconTrash = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconCalendar = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconClock = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconHashtag = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;

// 2. Helper function to calculate hours
export const calculateHours = (start, end) => {
  if (!start || !end) return 0;
  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);
  const diff = (endH + endM / 60) - (startH + startM / 60);
  return diff > 0 ? parseFloat(diff.toFixed(2)) : 0;
};

// 3. Generate 10-minute time intervals
const generateTimeOptions = () => {
  const options = [];
  for (let i = 8 * 60; i <= 20 * 60; i += 10) {
    const h = Math.floor(i / 60);
    const m = i % 60;
    const isPM = h >= 12;
    const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
    const label = `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;
    const value = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    options.push({ label, value });
  }
  return options;
};

export default function TimesheetForm({ entries, setEntries }) {
  const timeOptions = useMemo(() => generateTimeOptions(), []);
  const listEndRef = useRef(null);
  const lastEntryId = useRef(null);

  useEffect(() => {
    // If a new entry was added, scroll to it
    if (entries.length > 0) {
      const latestEntry = entries[entries.length - 1];
      if (latestEntry.id !== lastEntryId.current) {
        lastEntryId.current = latestEntry.id;
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [entries.length]);

  const updateEntry = (id, field, value) => {
    setEntries((prev) => 
      prev.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry)
    );
  };

  const addEntryRow = () => {
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), week: 'Week 1', date: '', start: '', end: '' }
    ]);
  };

  const removeEntryRow = (id) => {
    setEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  // Reusable Tailwind classes
  const inputClass = "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900";
  const labelClass = "text-xs font-semibold text-gray-500 uppercase flex items-center gap-1.5 mb-2 tracking-wide";
  const primaryBtnClass = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 bg-gray-900 text-white shadow hover:bg-gray-800 h-10 px-4 py-2 gap-2 cursor-pointer";
  const destructiveBtnClass = "inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-500 bg-red-50 text-red-600 shadow-sm hover:bg-red-100 hover:text-red-700 h-10 px-4 py-2 gap-2 cursor-pointer border border-red-100";
  const cardClass = "rounded-xl border border-gray-200 bg-white shadow-sm p-5 md:p-6 relative transition-all";

  return (
    <div className="pt-8 border-t border-gray-200 mt-8">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h3 className="font-bold text-xl tracking-tight text-gray-900">Timesheet Entries</h3>
          <p className="text-sm text-gray-500 mt-1">Add and manage your working hours</p>
        </div>
        <button onClick={addEntryRow} type="button" className={`${primaryBtnClass} w-full sm:w-auto`}>
          <IconPlus /> Add Row
        </button>
      </div>
      
      {/* Entries List */}
      <div className="space-y-5">
        {entries.map((entry, index) => {
          const dailyHours = calculateHours(entry.start, entry.end);
          const isNew = entry.id === lastEntryId.current;

          return (
            <div 
              key={entry.id} 
              className={`${cardClass} ${isNew ? 'ring-2 ring-blue-500/20 border-blue-200 bg-blue-50/30' : ''}`}
              ref={index === entries.length - 1 ? listEndRef : null}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                
                {/* Week Field */}
                <div className="md:col-span-2">
                  <label className={labelClass}>
                    <IconHashtag /> Week
                  </label>
                  <select 
                    value={entry.week || ""} 
                    onChange={(e) => updateEntry(entry.id, 'week', e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select week</option>
                    <option value="Week 1">Week 1</option>
                    <option value="Week 2">Week 2</option>
                    <option value="Week 3">Week 3</option>
                    <option value="Week 4">Week 4</option>
                  </select>
                </div>

                {/* Date Field */}
                <div className="md:col-span-3">
                  <label className={labelClass}>
                    <IconCalendar /> Date
                  </label>
                  <input 
                    type="date" 
                    value={entry.date} 
                    onChange={(e) => updateEntry(entry.id, 'date', e.target.value)} 
                    className={inputClass}
                    autoFocus={isNew}
                  />
                </div>

                {/* Start Time Field */}
                <div className="md:col-span-3">
                  <label className={labelClass}>
                    <IconClock /> Start Time
                  </label>
                  <select 
                    value={entry.start || ""} 
                    onChange={(e) => updateEntry(entry.id, 'start', e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select...</option>
                    {timeOptions.map(opt => (
                      <option key={`start-${opt.value}`} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Time Field */}
                <div className="md:col-span-3">
                  <label className={labelClass}>
                    <IconClock /> End Time
                  </label>
                  <select 
                    value={entry.end || ""} 
                    onChange={(e) => updateEntry(entry.id, 'end', e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>Select...</option>
                    {timeOptions.map(opt => (
                      <option key={`end-${opt.value}`} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Total Hours Display */}
                <div className="md:col-span-1 flex flex-row md:flex-col justify-between items-center md:items-start md:justify-end pt-4 md:pt-0 mt-2 md:mt-0 border-t border-gray-100 md:border-none">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-0 md:mb-2 tracking-wide">Hours</label>
                  <div className={`flex h-10 w-full md:w-auto items-center justify-center font-bold text-sm rounded-md px-4 border ${
                    dailyHours > 0 ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-100 text-gray-900 border-gray-200'
                  }`}>
                    {dailyHours || '-'}
                  </div>
                </div>

                {/* Desktop Delete Button */}
                <button 
                  onClick={() => removeEntryRow(entry.id)} 
                  className="hidden md:flex absolute -top-3 -right-3 h-8 w-8 rounded-full shadow-md z-10 items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove Entry"
                >
                  <IconTrash />
                </button>
                
                {/* Mobile Delete Button */}
                <button
                  onClick={() => removeEntryRow(entry.id)}
                  className={`${destructiveBtnClass} md:hidden w-full mt-4`}
                >
                  <IconTrash /> Remove Entry
                </button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
