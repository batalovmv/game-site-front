import React, { useState } from 'react';
import './style.css';
import { Carousel } from 'antd';

interface Game {
    id: number;
    title: string;
    coverImage: string;
    screenshots?: string[];
    rating: number;
    platforms: string[];
    multiplayerInfo: {
        online: boolean;
        maxPlayers: number;
    };
}

interface GameCardProps {
    game: Game;
    getScreens: (type: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, getScreens }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [screenshotsLoaded, setScreenshotsLoaded] = useState(false);
    const handleMouseEnter =  () => {
        if (!screenshotsLoaded) {
            getScreens(game.id)
            setScreenshotsLoaded(true);
        }
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };
     return (
        <div className="game-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <h3>{game.title}</h3>
            {isHovering && game.screenshots?.length ? (
                <Carousel autoplay>
                    {game.screenshots.map((screenshot, index) => (
                        <div key={index}>
                            <img src={screenshot} alt={`Screenshot ${index + 1}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Carousel>
            ) : (
                <img src={game.coverImage} alt={game.title} style={{ width: '100%' }} />
            )}
            <p>Rating: {game.rating}</p>
            <p>Platforms: {game.platforms.join(', ')}</p>
            {game.multiplayerInfo.online && (
                <p>Online Multiplayer: Up to {game.multiplayerInfo.maxPlayers} players</p>
            )}
        </div>
    );
};

export default GameCard;