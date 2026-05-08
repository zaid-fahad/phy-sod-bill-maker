// src/components/TimesheetForm.jsx
import { useMemo, useEffect, useRef } from 'react';
import { calculateHours } from '../utils/hours';
import Input from './ui/Input';
import Select from './ui/Select';
import DatePicker from './ui/DatePicker';

// 1. Built-in SVG Icons
const IconPlus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const IconTrash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconCalendar = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconClock = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconHashtag = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;

const WEEK_OPTIONS = [
  { label: 'Week 1', value: 'Week 1' },
  { label: 'Week 2', value: 'Week 2' },
  { label: 'Week 3', value: 'Week 3' },
  { label: 'Week 4', value: 'Week 4' },
];

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

export default function TimesheetForm({ entries, setEntries, lastAddedId, setLastAddedId }) {
  const timeOptions = useMemo(() => generateTimeOptions(), []);
  const listEndRef = useRef(null);
  const scrollTriggeredRef = useRef(null);

  useEffect(() => {
    if (lastAddedId && lastAddedId !== scrollTriggeredRef.current) {
      scrollTriggeredRef.current = lastAddedId;
      setTimeout(() => {
        listEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [lastAddedId]);

  const updateEntry = (id, field, value) => {
    setEntries((prev) => 
      prev.map((entry) => entry.id === id ? { ...entry, [field]: value } : entry)
    );
  };

  const addEntryRow = () => {
    const newId = Date.now();
    setEntries((prev) => [
      ...prev,
      { id: newId, week: 'Week 1', date: '', start: '', end: '' }
    ]);
    if (setLastAddedId) setLastAddedId(newId);
  };

  const removeEntryRow = (id) => {
    setEntries((prev) => prev.filter(entry => entry.id !== id));
  };

  return (
    <div className="pt-12 border-t border-app-border mt-12">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 mb-10">
        <div>
          <h3 className="font-black text-2xl tracking-tight text-app-text">Log Entries</h3>
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">Track your session hours here</p>
        </div>
        <button 
          onClick={addEntryRow} 
          type="button" 
          className="inline-flex items-center justify-center rounded-2xl text-xs font-black uppercase tracking-widest transition-all bg-app-text text-app-paper shadow-retro hover:shadow-none hover:translate-x-1 hover:translate-y-1 h-14 px-8 gap-3 cursor-pointer active:scale-95 dark:shadow-none dark:hover:bg-retro-sage dark:hover:text-black"
        >
          <IconPlus /> New Row
        </button>
      </div>
      
      <div className="space-y-8 ">
        {entries.map((entry, index) => {
          const dailyHours = calculateHours(entry.start, entry.end);
          const isNew = entry.id === lastAddedId;

          return (
            <div 
              key={entry.id} 
              className={`
                group relative bg-app-surface border-2 rounded-[2rem] p-8 transition-all duration-500
                ${isNew ? 'border-app-text bg-app-paper shadow-retro dark:shadow-none' : 'border-app-border hover:border-black/20 dark:hover:border-white/20'}
              `}
              ref={index === entries.length - 1 ? listEndRef : null}
            >
              <div className="flex flex-col gap-8">
                {/* Row 1: Week and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Select 
                    label="Active Week" 
                    icon={IconHashtag}
                    options={WEEK_OPTIONS}
                    value={entry.week}
                    onChange={(val) => updateEntry(entry.id, 'week', val)}
                  />
                  <DatePicker 
                    label="Session Date" 
                    icon={IconCalendar}
                    value={entry.date}
                    onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  />
                </div>

                {/* Row 2: Time and Hours */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                  <Select 
                    label="Clock In" 
                    icon={IconClock}
                    options={timeOptions}
                    value={entry.start}
                    onChange={(val) => updateEntry(entry.id, 'start', val)}
                    placeholder="00:00"
                  />
                  <Select 
                    label="Clock Out" 
                    icon={IconClock}
                    options={timeOptions}
                    value={entry.end}
                    onChange={(val) => updateEntry(entry.id, 'end', val)}
                    placeholder="00:00"
                  />
                  <div className="flex flex-col">
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
                      Total Duration
                    </label>
                    <div className={`
                      flex h-14 items-center justify-center font-black text-sm rounded-2xl border-2 transition-all duration-500
                      ${dailyHours > 0 
                        ? 'bg-app-text text-app-paper border-app-text shadow-retro-sm -translate-x-[1px] -translate-y-[1px] dark:shadow-none' 
                        : 'bg-app-paper text-gray-300 border-app-border'}
                    `}>
                      {dailyHours || '0.00'} HRS
                    </div>
                  </div>
                </div>

                {/* Desktop Delete Button */}
                <button 
                  onClick={() => removeEntryRow(entry.id)} 
                  className="hidden md:flex absolute -top-4 -right-4 h-10 w-10 rounded-full shadow-2xl z-10 items-center justify-center bg-app-text text-app-paper border-2 border-app-surface hover:bg-retro-terracotta transition-all cursor-pointer opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100"
                  title="Remove Entry"
                >
                  <IconTrash />
                </button>
                
                {/* Mobile Delete Button */}
                <button
                  onClick={() => removeEntryRow(entry.id)}
                  className="md:hidden w-full flex items-center justify-center gap-3 py-4.5 rounded-2xl bg-app-paper text-gray-400 font-black uppercase tracking-widest text-[10px] border-2 border-app-border active:bg-retro-terracotta active:text-white active:border-retro-terracotta transition-all"
                >
                  <IconTrash /> Remove this log
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
