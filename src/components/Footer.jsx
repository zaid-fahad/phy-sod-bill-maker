export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 tracking-tight">BillGen</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              An automated bill generation tool designed for students on Duty of Independent University, Bangladesh.
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-sm font-semibold text-gray-900 mb-1">Developed by</p>
            <p className="text-lg font-bold text-blue-600 mb-4">Momotaj Akther Happy</p>
            <div className="flex flex-col md:items-end gap-1 text-xs text-gray-500 font-medium">
              <span>ID: 2430798</span>
              <span>Computer Science & Engineering</span>
              <span>School of Engineering, Technology & Sciences</span>
            </div>
          </div>
        </div>
        {/* <div className="border-t border-gray-100 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 Independent University, Bangladesh. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
