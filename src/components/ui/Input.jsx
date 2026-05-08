export default function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
            transition-all duration-200 outline-none
            focus:border-blue-600 focus:ring-4 focus:ring-blue-50/50
            placeholder:text-gray-400
            ${Icon ? 'pl-10' : ''}
          `}
        />
      </div>
    </div>
  );
}
