import React from 'react';
import GameCard from '../GameCard';
import { Game } from '../../features/games/types';
import './style.css';



interface GameListProps {
    games: Game[];
    getScreens: (type: number) => void;
}

const GameList: React.FC<GameListProps> = ({ games, getScreens }) => {
    return (
        <div className="game-list">
            {games.map(game => (
                <GameCard getScreens={getScreens} key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GameList;