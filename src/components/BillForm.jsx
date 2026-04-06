import TimesheetForm from './TimesheetForm';

export default function BillForm({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setEntries = (updateFn) => {
    setFormData((prev) => ({
      ...prev,
      entries: typeof updateFn === 'function' ? updateFn(prev.entries) : updateFn
    }));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Billing Month</label>
        <input type="text" name="month" value={formData.month} onChange={handleChange} className="w-full p-2 border rounded-md" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
          <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Faculty Name</label>
          <input type="text" name="facultyName" value={formData.facultyName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">MTB A/C Number</label>
          <input type="text" name="mtbAccount" value={formData.mtbAccount} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department</label>
           <input type="text" name="headName" value={formData.headName} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>
      </div>

      <TimesheetForm entries={formData.entries} setEntries={setEntries} />
    </div>
  );
}