import React from 'react';
import './style.css'; 

interface MainPageProps {
    leftChildren: React.ReactNode;  // Для фильтров и прочего
    rightChildren: React.ReactNode; // Для списка игр
}

const MainPage: React.FC<MainPageProps> = ({ leftChildren, rightChildren }) => {
    return (
        <div className="styled-container">
            <div className="left-column">
                {leftChildren}
            </div>
            <div className="right-column">
                {rightChildren}
            </div>
        </div>
    );
};

export default MainPage;