import { useMemo } from "react";
import { calculateHours } from "./TimesheetForm";
import iubLogo from '../assets/iub.png';

const formatAppDate = (dateString) => {
  if (!dateString) return '';
  const [y, m, d] = dateString.split('-');
  return `${d}/${m}/${y.slice(2)}`;
};

const formatAppTime = (timeString) => {
  if (!timeString) return '';
  const [h, m] = timeString.split(':').map(Number);
  const isPM = h >= 12;
  const displayH = h > 12 ? h - 12 : (h === 0 ? 12 : h);
  const displayHH = displayH.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  return `${displayHH}:${mm}${isPM ? 'PM' : 'AM'}`;
};

export default function BillPreview({ data }) {
  
  // Group entries by week, map formatted values, and calculate auto-totals
  const groupedData = useMemo(() => {
    const weeksList = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    let grandTotal = 0;

    const grouped = weeksList.map(weekName => {
      const weekEntries = data.entries.filter(e => e.week === weekName);
      if (weekEntries.length === 0) return null;

      let weeklyTotal = 0;
      const formattedEntries = weekEntries.map(entry => {
        const dailyHours = calculateHours(entry.start, entry.end);
        weeklyTotal += dailyHours;
        return {
          ...entry,
          dateFormatted: formatAppDate(entry.date),
          startFormatted: formatAppTime(entry.start),
          endFormatted: formatAppTime(entry.end),
          dailyHours: dailyHours > 0 ? `${dailyHours} hr` : ''
        };
      });

      grandTotal += weeklyTotal;
      
      return {
        week: weekName,
        entries: formattedEntries,
        weeklyTotal: weeklyTotal > 0 ? `${weeklyTotal}hr` : '',
        rowSpanCount: formattedEntries.length
      };
    }).filter(Boolean); // remove empty weeks

    return { grouped, grandTotal: grandTotal > 0 ? `${grandTotal} hr` : '' };
  }, [data.entries]);

  return (
    <div className="bg-white font-serif text-black max-w-[8.5in] mx-auto pb-10">
    <div className="relative flex justify-center items-center mb-6 min-h-[100px]">
        {/* Left-pinned Logo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full flex items-center justify-center ">
          {/* <span className="text-xs text-gray-400">Logo</span> */}
          {/* <img src="src\assets\iub.png" alt="" /> */}
          <img src={iubLogo} alt="IUB Logo" />
        </div>

        {/* Truly Centered Content */}
        <div className="text-center px-28"> 
          <h1 className="text-2xl font-bold tracking-wide uppercase">Independent University, Bangladesh</h1>
          <h2 className="text-lg font-semibold mt-1">Department of Physical Sciences</h2>
          <h3 className="text-md font-medium mt-1">School of Engineering, Technology & Sciences</h3>
          <h4 className="text-md font-bold mt-4">SoD Bill for the Month of {data.month}</h4>
        </div>
      </div>

      <div>
        <hr class="h-15 border-t-20" />

      </div>

      <div className="mb-8">
        {/* <div className="font-bold">NAME OF THE STUDENT:</div>
        <div>{data.studentName}</div>
        
        <div className="font-bold">ID OF THE STUDENT:</div>
        <div>{data.studentId}</div>
        
        <div className="font-bold">MOBILE NUMBER:</div>
        <div>{data.mobile}</div>
        
        <div className="font-bold mt-2">NAME OF THE FACULTY:</div>
        <div className="mt-2">{data.facultyName}</div>
        
        <div className="font-bold">MTB A/C NUMBER:</div>
        <div>{data.mtbAccount}</div> */}


        <table className="w-full border-collapse border border-black text-start text-[14px]">
        
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold" rowSpan="1">NAME OF THE STUDENT: </td>
              <td className="border border-black p-2 font-semibold" rowSpan="1">{data.studentName}</td>
              <td className="border border-black p-12 font-semibold" rowSpan="4">MTB A/C NUMBER:<br/>{data.mtbAccount}</td>
            </tr>
             <tr>
              <td className="border border-black p-2 font-semibold" rowSpan="1">ID OF THE STUDENT: </td>
              <td className="border border-black p-2 font-semibold " rowSpan="1">{data.studentId}</td>
            </tr>
             <tr>
              <td className="border border-black p-2 font-semibold" rowSpan="1">MOBILE NUMBER: </td>
              <td className="border border-black p-2 font-semibold" rowSpan="1">{data.mobile}</td>
            </tr>
             <tr>
              <td className="border border-black p-2 font-semibold" rowSpan="1">NAME OF THE FACULTY: </td>
              <td className="border border-black p-2 font-semibold" rowSpan="1">{data.facultyName}</td>
            </tr>
          
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <table className="w-full border-collapse border border-black text-center text-[15px]">
          <thead>
            <tr>
              <th className="border border-black p-2 font-semibold">Week</th>
              <th className="border border-black p-2 font-semibold">Date</th>
              <th className="border border-black p-2 font-semibold">Starting-Time</th>
              <th className="border border-black p-2 font-semibold">End-Time</th>
              <th className="border border-black p-2 font-semibold">Daily Total Hours</th>
              <th className="border border-black p-2 font-semibold">Weekly Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.grouped.map((group) => (
              group.entries.map((entry, index) => (
                <tr key={entry.id}>
                  {/* Render the Week cell only for the first row of the group */}
                  {index === 0 && (
                    <td className="border border-black p-2 font-semibold" rowSpan={group.rowSpanCount}>
                      {group.week}
                    </td>
                  )}
                  
                  <td className="border border-black p-2">{entry.dateFormatted}</td>
                  <td className="border border-black p-2">{entry.startFormatted}</td>
                  <td className="border border-black p-2">{entry.endFormatted}</td>
                  <td className="border border-black p-2">{entry.dailyHours}</td>

                  {/* Render the Weekly Total cell only for the first row of the group */}
                  {index === 0 && (
                    <td className="border border-black p-2 font-semibold align-middle" rowSpan={group.rowSpanCount}>
                      {group.weeklyTotal}
                    </td>
                  )}
                </tr>
              ))
            ))}
            
            {/* Monthly Total Row */}
            <tr>
              <td colSpan="4" className="border border-black p-2 text-right font-bold pr-4">Monthly Total Hour</td>
              <td colSpan="2" className="border border-black p-2 text-center font-bold">
                {groupedData.grandTotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-24 grid grid-cols-3 gap-4 text-center text-[15px]">
        <div>
          <div className="border-t border-black pt-1 px-4 inline-block">
            <p>Signature of the Student</p>
            <p>({data.studentName})</p>
          </div>
        </div>
        <div>
          <div className="border-t border-black pt-1 px-4 inline-block">
            <p>Signature of the Faculty</p>
            <p>({data.facultyName})</p>
          </div>
        </div>
        <div>
          <div className="border-t border-black pt-1 px-4 inline-block">
            <p>Signature of the Head</p>
            <p>({data.headName})</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}