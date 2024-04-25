import React from 'react';
import './style.css';

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
    showScreenshots: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ game, showScreenshots }) => {
    return (
        <div className="game-card">
            <h3>{game.title}</h3>
            <img src={game.coverImage} alt={game.title} />
            {showScreenshots && game.screenshots?.map((screenshot, index) => (
                <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} />
            ))}
            <p>Rating: {game.rating}</p>
            <p>Platforms: {game.platforms.join(', ')}</p>
            {game.multiplayerInfo.online && (
                <p>Online Multiplayer: Up to {game.multiplayerInfo.maxPlayers} players</p>
            )}
        </div>
    );
};

export default GameCard;