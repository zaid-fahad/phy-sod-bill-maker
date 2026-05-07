export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-blue-200 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">BillGen</h1>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">IUB Digital Portal</p>
            </div>
          </div>
          <div className="hidden md:block">
            {/* <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Department of Physical Sciences</p>
              <p className="text-xs text-gray-500">School of Engineering, Technology & Sciences</p>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
