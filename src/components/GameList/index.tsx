import React from 'react';
import GameCard from '../GameCard';
import { Game } from '../../features/games/types';




interface GameListProps {
    games: Game[];
    showScreenshots: boolean;
}

const GameList: React.FC<GameListProps> = ({ games, showScreenshots }) => {
    return (
        <div className="game-list">
            {games.map(game => (
                <GameCard key={game.id} game={game} showScreenshots={showScreenshots} />
            ))}
        </div>
    );
};

export default GameList;