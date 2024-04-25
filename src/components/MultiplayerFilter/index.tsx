import React from 'react';

interface MultiplayerFilterProps {
    onMultiplayerSelect: (type: string) => void;
}

const MultiplayerFilter: React.FC<MultiplayerFilterProps> = ({ onMultiplayerSelect }) => {
    return (
        <div className="multiplayer-filter">
            <button onClick={() => onMultiplayerSelect('online')}>Online Multiplayer</button>
            <button onClick={() => onMultiplayerSelect('offline')}>Offline Multiplayer</button>
        </div>
    );
};

export default MultiplayerFilter;