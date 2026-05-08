// src/components/TimesheetForm.jsx
import { useMemo, useEffect, useRef } from 'react';
import { calculateHours } from '../utils/hours';
import Input from './ui/Input';
import Select from './ui/Select';
import DatePicker from './ui/DatePicker';

// 1. Built-in SVG Icons
const IconPlus = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const IconTrash = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const IconCalendar = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconClock = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconHashtag = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>;

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
    <div className="pt-10 border-t border-gray-100 mt-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h3 className="font-bold text-2xl tracking-tight text-gray-900">Timesheet Entries</h3>
          <p className="text-sm text-gray-500 mt-1">Add and manage your working hours</p>
        </div>
        <button 
          onClick={addEntryRow} 
          type="button" 
          className="inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all bg-gray-900 text-white shadow-lg hover:bg-gray-800 hover:shadow-gray-200 h-12 px-6 gap-2 cursor-pointer active:scale-95"
        >
          <IconPlus /> Add Row
        </button>
      </div>
      
      <div className="space-y-6">
        {entries.map((entry, index) => {
          const dailyHours = calculateHours(entry.start, entry.end);
          const isNew = entry.id === lastAddedId;

          return (
            <div 
              key={entry.id} 
              className={`
                group relative bg-white border rounded-2xl p-6 transition-all duration-300
                ${isNew ? 'ring-2 ring-blue-500/20 border-blue-200 bg-blue-50/10' : 'border-gray-100 hover:border-gray-200 hover:shadow-md'}
              `}
              ref={index === entries.length - 1 ? listEndRef : null}
            >
              <div className="flex flex-col gap-5">
                {/* Row 1: Week and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Select 
                    label="Week" 
                    icon={IconHashtag}
                    options={WEEK_OPTIONS}
                    value={entry.week}
                    onChange={(val) => updateEntry(entry.id, 'week', val)}
                  />
                  <DatePicker 
                    label="Date" 
                    icon={IconCalendar}
                    value={entry.date}
                    onChange={(e) => updateEntry(entry.id, 'date', e.target.value)}
                  />
                </div>

                {/* Row 2: Time and Hours */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                  <Select 
                    label="Start Time" 
                    icon={IconClock}
                    options={timeOptions}
                    value={entry.start}
                    onChange={(val) => updateEntry(entry.id, 'start', val)}
                    placeholder="00:00"
                  />
                  <Select 
                    label="End Time" 
                    icon={IconClock}
                    options={timeOptions}
                    value={entry.end}
                    onChange={(val) => updateEntry(entry.id, 'end', val)}
                    placeholder="00:00"
                  />
                  <div className="flex flex-col">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
                      Total Hours
                    </label>
                    <div className={`
                      flex h-11 items-center justify-center font-bold text-sm rounded-xl border transition-colors
                      ${dailyHours > 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100' : 'bg-gray-50 text-gray-400 border-gray-100'}
                    `}>
                      {dailyHours || '0'} hr
                    </div>
                  </div>
                </div>

                {/* Desktop Delete Button */}
                <button 
                  onClick={() => removeEntryRow(entry.id)} 
                  className="hidden md:flex absolute -top-3 -right-3 h-9 w-9 rounded-full shadow-xl z-10 items-center justify-center bg-white border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Remove Entry"
                >
                  <IconTrash />
                </button>
                
                {/* Mobile Delete Button */}
                <button
                  onClick={() => removeEntryRow(entry.id)}
                  className="md:hidden w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm border border-red-100 active:scale-95 transition-transform"
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
