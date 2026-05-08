import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

export default function Home() {
  const [formData, setFormData] = useState({
    month: 'March 2026',
    department: 'Physical Sciences',
    school: 'Engineering, Technology & Sciences',
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

  const [activeTab, setActiveTab] = useState('edit');
  const [lastAddedId, setLastAddedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customFileName, setCustomFileName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const printRef = useRef(null);

  const openDownloadModal = () => {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const sanitizedName = formData.studentName.trim().replace(/\s+/g, '_') || 'Student';
    const sanitizedMonth = formData.month.trim().replace(/\s+/g, '_') || 'Month';
    
    const defaultName = `${sanitizedName}_${sanitizedMonth}_Bill`;
    setCustomFileName(defaultName);
    setIsModalOpen(true);
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const dataUrl = await toPng(element, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });

      if (!dataUrl || !dataUrl.startsWith('data:image/png')) {
        throw new Error("Invalid image data generated");
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const availableWidth = pdfWidth - (margin * 2);
      
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const displayHeight = (imgHeight * availableWidth) / imgWidth;

      pdf.addImage(dataUrl, 'PNG', margin, margin, availableWidth, displayHeight, undefined, 'FAST');
      pdf.save(`${customFileName || 'Bill'}.pdf`);
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("PDF generation error: ", error);
      alert("Something went wrong while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMobileDownload = () => {
    setActiveTab('preview');
    setTimeout(() => {
      openDownloadModal();
    }, 400);
  };

  const handleAddRow = () => {
    const newId = Date.now();
    setFormData((prev) => ({
      ...prev,
      entries: [
        ...prev.entries,
        { id: newId, week: 'Week 1', date: '', start: '', end: '' }
      ]
    }));
    setLastAddedId(newId);
    setActiveTab('edit');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20 lg:pb-0">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:hidden sticky top-16 z-30 bg-gray-50/95 backdrop-blur-sm py-3 mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex">
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
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          <div className={`lg:col-span-5 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Bill Details
              </h2>
              <BillForm formData={formData} setFormData={setFormData} lastAddedId={lastAddedId} setLastAddedId={setLastAddedId} />
            </div>
          </div>

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
                onClick={openDownloadModal}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm flex items-center justify-center min-w-[160px] cursor-pointer"
              >
                Download PDF
              </button>
            </div>
            
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200 p-2 lg:p-4">
              <div className="min-w-[750px] mx-auto p-4 lg:p-8 bg-white" ref={printRef}>
                <BillPreview data={formData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Download Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => !isGenerating && setIsModalOpen(false)} 
        title="Ready to Download"
      >
        <div className="space-y-6">
          <Input 
            label="File Name" 
            value={customFileName} 
            onChange={(e) => setCustomFileName(e.target.value)}
            placeholder="Enter file name..."
            autoFocus
          />
          
          <div className="flex gap-3 pt-2">
            <button 
              disabled={isGenerating}
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              disabled={isGenerating}
              onClick={handleDownloadPdf}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Download'
              )}
            </button>
          </div>
        </div>
      </Modal>

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
            onClick={handleMobileDownload}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}
