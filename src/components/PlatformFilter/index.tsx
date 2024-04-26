import React, { useState } from 'react';
import './style.css';
import Title from 'antd/es/typography/Title';
import Button from 'antd/es/button';
import { platform } from '../../features/games/types';

interface PlatformFilterProps {
    onPlatformSelect: (platform: number) => void;
    platforms: platform[]
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({ onPlatformSelect,platforms }) => {
const [isShowAll, setIsShowAll] = useState(false)
    const copyPlatroms = [...platforms]
    const slicedPlatforms = copyPlatroms.splice(0,4)
    const displayderPlatforms = isShowAll ?  platforms: slicedPlatforms 
    return (<>
        {platforms && <div className="platform-filter">
            <Title level={4}>Выбор платформы</Title>
            {displayderPlatforms.map(platform => (
                <Button key={platform.id} onClick={() => onPlatformSelect(platform.id)}>
                    {platform.name}
                </Button>
            ))}
            <Button onClick={() => setIsShowAll(!isShowAll)}>
                {isShowAll ? 'Свернуть' : 'Показать все'}
            </Button>
        </div>}
        
   </> );
};

export default PlatformFilter;