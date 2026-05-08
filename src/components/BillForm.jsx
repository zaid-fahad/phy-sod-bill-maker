import { useState } from 'react';
import TimesheetForm from './TimesheetForm';
import Input from './ui/Input';
import Select from './ui/Select';

// Define some initial options for Dept and School
const DEPT_OPTIONS = [
  { label: 'Physical Sciences', value: 'Physical Sciences' },
  { label: 'Computer Science & Engineering', value: 'Computer Science & Engineering' },
  { label: 'Electrical & Electronic Engineering', value: 'Electrical & Electronic Engineering' },
  { label: 'Custom...', value: 'custom' },
];

const SCHOOL_OPTIONS = [
  { label: 'Engineering, Technology & Sciences', value: 'Engineering, Technology & Sciences' },
  { label: 'Business & Entrepreneurship', value: 'Business & Entrepreneurship' },
  { label: 'Liberal Arts & Social Sciences', value: 'Liberal Arts & Social Sciences' },
  { label: 'Custom...', value: 'custom' },
];

export default function BillForm({ formData, setFormData, lastAddedId, setLastAddedId }) {
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [isCustomSchool, setIsCustomSchool] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeptChange = (val) => {
    if (val === 'custom') {
      setIsCustomDept(true);
      setFormData(prev => ({ ...prev, department: '' }));
    } else {
      setIsCustomDept(false);
      setFormData(prev => ({ ...prev, department: val }));
    }
  };

  const handleSchoolChange = (val) => {
    if (val === 'custom') {
      setIsCustomSchool(true);
      setFormData(prev => ({ ...prev, school: '' }));
    } else {
      setIsCustomSchool(false);
      setFormData(prev => ({ ...prev, school: val }));
    }
  };

  const setEntries = (updateFn) => {
    setFormData((prev) => ({
      ...prev,
      entries: typeof updateFn === 'function' ? updateFn(prev.entries) : updateFn
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input 
            label="Billing Month" 
            name="month" 
            value={formData.month} 
            onChange={handleChange} 
            placeholder="e.g. March 2026"
          />
        </div>

        <div className="md:col-span-2">
          <Select 
            label="Department" 
            options={DEPT_OPTIONS} 
            value={isCustomDept ? 'custom' : formData.department} 
            onChange={handleDeptChange} 
          />
          {isCustomDept && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1">
              <Input 
                placeholder="Type department name..." 
                name="department" 
                value={formData.department} 
                onChange={handleChange} 
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Select 
            label="School / Faculty" 
            options={SCHOOL_OPTIONS} 
            value={isCustomSchool ? 'custom' : formData.school} 
            onChange={handleSchoolChange} 
          />
          {isCustomSchool && (
            <div className="mt-3 animate-in fade-in slide-in-from-top-1">
              <Input 
                placeholder="Type school name..." 
                name="school" 
                value={formData.school} 
                onChange={handleChange} 
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <Input label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} />
        </div>
        
        <Input label="Student ID" name="studentId" value={formData.studentId} onChange={handleChange} />
        <Input label="Mobile Number" type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
        
        <div className="md:col-span-2">
          <Input label="Faculty Name" name="facultyName" value={formData.facultyName} onChange={handleChange} />
        </div>
        
        <Input label="MTB A/C Number" name="mtbAccount" value={formData.mtbAccount} onChange={handleChange} />
        <Input label="Head of Department" name="headName" value={formData.headName} onChange={handleChange} />
      </div>

      <TimesheetForm 
        entries={formData.entries} 
        setEntries={setEntries} 
        lastAddedId={lastAddedId} 
        setLastAddedId={setLastAddedId} 
      />
    </div>
  );
}
