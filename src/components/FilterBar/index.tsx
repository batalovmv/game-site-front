import React from 'react';

interface FilterBarProps {
    onFilterChange: (filter: string) => void;
    onSortChange: (sortType: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
    return (
        <div className="filter-bar">
            <button onClick={() => onSortChange('rating')}>Sort by Rating</button>
            <input
                type="text"
                placeholder="Search games..."
                onChange={(e) => onFilterChange(e.target.value)}
            />
        </div>
    );
};

export default FilterBar;