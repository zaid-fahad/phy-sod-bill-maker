import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image'; // Modern alternative!
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const [formData, setFormData] = useState({
    month: 'March 2026',
    department: 'Department of Physical Sciences',
    school: 'School of Engineering, Technology & Sciences',
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

  const [activeTab, setActiveTab] = useState('edit'); // 'edit' or 'preview'
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

  const handleAddRow = () => {
    setFormData((prev) => ({
      ...prev,
      entries: [
        ...prev.entries,
        { id: Date.now(), week: 'Week 1', date: '', start: '', end: '' }
      ]
    }));
    // On mobile, if we add a row, we should probably be in the edit tab
    setActiveTab('edit');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20 lg:pb-0">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tabs */}
        <div className="flex lg:hidden mb-6 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'edit' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Edit Form
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'preview' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Preview Bill
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          {/* Left Column: Form */}
          <div className={`lg:col-span-5 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Bill Details
              </h2>
              <BillForm formData={formData} setFormData={setFormData} />
            </div>
          </div>

          {/* Right Column: Preview & Download */}
          <div className={`lg:col-span-7 flex flex-col gap-6 lg:sticky lg:top-24 ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Document Preview
              </h2>
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
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-2 lg:p-4">
              {/* Print container */}
              <div className="min-w-[750px] mx-auto p-4 lg:p-8 bg-white" ref={printRef}>
                <BillPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Sticky Mobile Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <button 
            onClick={handleAddRow}
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Row
          </button>
          <button 
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform ${
              isGenerating ? "bg-gray-400 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {isGenerating ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
