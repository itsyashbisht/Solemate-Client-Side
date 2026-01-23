const FilterTabs = ({ tabs = [], activeTab, onTabChange }) => {
  return (
    <div className="flex items-center gap-2">
      {tabs?.length > 0 &&
        tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
    </div>
  );
};

export default FilterTabs;
