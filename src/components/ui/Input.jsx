export default function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-[0.15em] mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-app-text transition-colors z-10">
            <Icon size={16} strokeWidth={2} />
          </div>
        )}
        <input
          {...props}
          className={`
            w-full bg-app-surface border-2 border-black/10 dark:border-white/10 rounded-xl px-5 py-3.5 text-sm 
            transition-all duration-300 outline-none font-medium text-app-text
            placeholder:text-gray-300 dark:placeholder:text-gray-600
            focus:border-app-text focus:shadow-retro dark:focus:shadow-none
            ${Icon ? 'pl-12' : ''}
          `}
        />
      </div>
    </div>
  );
}
