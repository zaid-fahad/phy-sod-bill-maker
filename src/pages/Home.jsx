import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image'; // Modern alternative!
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';

export default function Home() {
  const [formData, setFormData] = useState({
    month: 'March 2026',
    studentName: 'your name',
    studentId: 'student id',
    mobile: '01xxxxxx',
    facultyName: 'Faculty name',
    mtbAccount: 'xxxxxxxxxxxxxx',
    headName: 'Head name',
    entries: [
      { id: 1, week: 'Week 1', date: '2026-03-01', start: '11:20', end: '15:50' },
      { id: 2, week: 'Week 1', date: '2026-03-02', start: '13:00', end: '16:00' },
      { id: 3, week: 'Week 1', date: '2026-03-03', start: '11:20', end: '15:50' },
      { id: 4, week: 'Week 2', date: '2026-03-08', start: '11:20', end: '14:20' },
    ]
  });

  const printRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      // 1. Take screenshot using the modern browser engine
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2, // Makes text sharp
        backgroundColor: '#ffffff',
      });

      // 2. Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // 3. Calculate aspect ratio to fit the A4 page
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10; // 10mm margin
      const availableWidth = pdfWidth - (margin * 2);
      const pdfHeight = (imgProps.height * availableWidth) / imgProps.width;

      // 4. Add to PDF and save
      pdf.addImage(dataUrl, 'PNG', margin, margin, availableWidth, pdfHeight);
      pdf.save(`${formData.studentName.replace(/\s+/g, '_')}_Bill.pdf`);
      
    } catch (error) {
      console.error("PDF generation error: ", error);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Left Column: Form */}
      <div className="w-full lg:w-[45%] bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Bill Generator</h1>
        <BillForm formData={formData} setFormData={setFormData} />
      </div>

      {/* Right Column: Preview & Download */}
      <div className="w-full lg:w-[55%] flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Document Preview</h2>
          <button 
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className={`px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center min-w-[160px] ${
              isGenerating 
                ? "bg-gray-400 cursor-not-allowed text-white" 
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generating...
              </span>
            ) : (
              "Download PDF"
            )}
          </button>
        </div>
        
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-2">
          {/* Print container */}
          <div className="min-w-[750px] mx-auto p-8 bg-white" ref={printRef}>
            <BillPreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}