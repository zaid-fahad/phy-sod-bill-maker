import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import BillForm from '../components/BillForm';
import BillPreview from '../components/BillPreview';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';

export default function Home({ toggleDarkMode, darkMode }) {
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
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(2, '0');
    const sanitizedName = formData.studentName.trim().replace(/\s+/g, '_') || 'Student';
    const sanitizedMonth = formData.month.trim().replace(/\s+/g, '_') || 'Month';
    const defaultName = `${sanitizedName}_${sanitizedMonth}_SoD_Bill_${dateStr}`;
    setCustomFileName(defaultName);
    setIsModalOpen(true);
  };

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const dataUrl = await toPng(element, { cacheBust: true, quality: 1, pixelRatio: 2, backgroundColor: '#ffffff' });
      if (!dataUrl || !dataUrl.startsWith('data:image/png')) throw new Error("Invalid image data");
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      const availableWidth = pdfWidth - (margin * 2);
      const img = new Image();
      img.src = dataUrl;
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
      const displayHeight = (img.naturalHeight * availableWidth) / img.naturalWidth;
      pdf.addImage(dataUrl, 'PNG', margin, margin, availableWidth, displayHeight, undefined, 'FAST');
      pdf.save(`${customFileName || 'Bill'}.pdf`);
      setIsModalOpen(false);
    } catch (error) {
      console.error("PDF error: ", error);
      alert("Capture error. Please try in standard browser.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMobileDownload = () => {
    setActiveTab('preview');
    setTimeout(() => openDownloadModal(), 500);
  };

  const handleAddRow = () => {
    const newId = Date.now();
    setFormData((prev) => ({
      ...prev,
      entries: [...prev.entries, { id: newId, week: 'Week 1', date: '', start: '', end: '' }]
    }));
    setLastAddedId(newId);
    setActiveTab('edit');
  };

  return (
    <div className="min-h-screen bg-app-paper flex flex-col pb-24 lg:pb-0 font-sans transition-colors duration-500">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 lg:px-8 py-8">
        {/* Mobile Tabs */}
        <div className="lg:hidden sticky top-[108px] z-40 -mx-6 px-6 py-4 bg-app-paper/80 backdrop-blur-xl border-b border-app-border mb-10 transition-colors duration-500">
          <div className="bg-app-surface  border-app-text p-1.5 rounded-2xl shadow-retro dark:shadow-none flex gap-1">
            <button 
              onClick={() => setActiveTab('edit')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${
                activeTab === 'edit' ? 'bg-app-text text-app-paper' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              Editor
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${
                activeTab === 'preview' ? 'bg-app-text text-app-paper' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          {/* Form Column */}
          <div className={`lg:col-span-5 ${activeTab === 'edit' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-app-surface border-2 border-app-border rounded-[2.5rem] px-6 py-10 shadow-retro dark:shadow-none transition-all hover:shadow-black/10">
              <h2 className="text-3xl font-black mb-10 text-app-text uppercase tracking-tight italic flex items-center gap-4">
                <div className="w-10 h-10 bg-retro-sage rounded-2xl flex items-center justify-center border-2 border-app-text shadow-retro-sm dark:shadow-none">
                  <svg className="w-6 h-6 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                SoD Bill Info
              </h2>
              <BillForm formData={formData} setFormData={setFormData} lastAddedId={lastAddedId} setLastAddedId={setLastAddedId} />
            </div>
          </div>

          {/* Preview Column */}
          <div className={`lg:col-span-7 flex flex-col gap-10 lg:sticky lg:top-[140px] ${activeTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8 bg-app-surface/70 backdrop-blur-md border-2 border-app-border rounded-[2rem] p-8 shadow-retro dark:shadow-none transition-colors duration-500">
              <h2 className="text-2xl font-black text-app-text uppercase tracking-tight italic flex items-center gap-4">
                <div className="w-10 h-10 bg-retro-blue rounded-2xl flex items-center justify-center border-2 border-app-text shadow-retro-sm dark:shadow-none">
                  <svg className="w-6 h-6 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                Bill Preview
              </h2>
              <button 
                onClick={openDownloadModal}
                className="px-10 py-4.5 bg-app-text text-app-paper rounded-2xl font-black uppercase tracking-widest shadow-retro dark:shadow-none hover:shadow-none dark:hover:bg-retro-sage dark:hover:text-black hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 text-xs border-2 border-transparent dark:border-white/10"
              >
                Export PDF
              </button>
            </div>
            
            <div className="bg-app-surface mt-6 border-2 border-app-border rounded-[3rem] shadow-retro dark:shadow-none overflow-hidden transition-all">
              <div className="overflow-x-auto">
                <div className="min-w-[750px] mx-auto p-12 bg-white" ref={printRef}>
                  <BillPreview data={formData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Export Modal */}
      <Modal isOpen={isModalOpen} onClose={() => !isGenerating && setIsModalOpen(false)} title="Export Settings">
        <div className="space-y-10 text-app-text">
          <Input label="Filename" value={customFileName} onChange={(e) => setCustomFileName(e.target.value)} placeholder="Type name..." autoFocus />
          <div className="flex gap-4">
            <button 
              disabled={isGenerating} 
              onClick={() => setIsModalOpen(false)}
              className="flex-1 px-8 py-5 border-2 border-app-border text-gray-400 dark:text-gray-500 rounded-3xl font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-50 text-[10px]"
            >
              Dismiss
            </button>
            <button 
              disabled={isGenerating} 
              onClick={handleDownloadPdf}
              className="flex-1 px-8 py-5 bg-app-text text-app-paper rounded-3xl font-black uppercase tracking-widest shadow-retro dark:shadow-none active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-3 text-[10px] border-2 border-transparent dark:border-white/10 dark:bg-retro-sage dark:text-black"
            >
              {isGenerating ? 'Capturing...' : 'Download'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Sticky Mobile Bar */}
      <div className="lg:hidden fixed  bottom-0 left-0 right-0 p-6 z-50">
        <div className=" bg-app-text dark:bg-app-surface text-app-paper dark:text-app-text rounded-[2.5rem] p-3 shadow-2xl flex gap-3 border border-white/10 dark:border-white/20">
          <button 
            onClick={handleAddRow}
            className="flex-1 bg-app-paper dark:bg-white/10 text-app-text dark:text-app-text py-4.5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Entry
          </button>
          <button 
            onClick={handleMobileDownload}
            className="flex-1 bg-retro-sage text-white dark:text-black py-4.5 rounded-[2rem] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all text-xs shadow-lg shadow-retro-sage/20 border border-white/20 dark:border-white/5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Get PDF
          </button>
        </div>
      </div>
    </div>
  );
}
