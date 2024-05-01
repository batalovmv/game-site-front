import React, { useEffect, useState } from 'react';
import './style.css';
import Input from 'antd/es/input/Input';
import Button from 'antd/es/button';

interface FilterBarProps {
    onFilterChange: (filter: string) => void;
    onSortChange: (sortType: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, onSortChange }) => {
    const [inputValue, setInputValue] = useState("");
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    

    useEffect(() => {
        if (isFirstLoad) {
            setIsFirstLoad(false);
            return;
        }
        const timeoutId = setTimeout(() => {
            onFilterChange(inputValue);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [inputValue]);
    return (
        <div className="filter-bar">
            <Button onClick={() => onSortChange('-rating')}>Sort by Rating</Button>
            <Input
                type="text"
                placeholder="Search games..."
                onChange={handleInputChange}
            />
            
            
        </div>
    );
};

export default FilterBar;