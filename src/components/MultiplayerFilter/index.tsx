import React from 'react';
import './style.css';
import Button from 'antd/es/button';
import Title from 'antd/es/typography/Title';
interface MultiplayerFilterProps {
    onMultiplayerSelect: (type: string) => void;
}

const MultiplayerFilter: React.FC<MultiplayerFilterProps> = ({ onMultiplayerSelect }) => {
    return (
        <div className="multiplayer-filter">
            <Title level={4}>Тип подключения</Title>
            <Button onClick={() => onMultiplayerSelect('online')}>Online</Button>
            <Button onClick={() => onMultiplayerSelect('offline')}>Offline</Button>
        </div>
    );
};

export default MultiplayerFilter;