import React from 'react';
import './style.css';
interface PlatformFilterProps {
    onPlatformSelect: (platform: string) => void;
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({ onPlatformSelect }) => {
    const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
    return (
        <div className="platform-filter">
            {platforms.map(platform => (
                <button key={platform} onClick={() => onPlatformSelect(platform)}>
                    {platform}
                </button>
            ))}
        </div>
    );
};

export default PlatformFilter;