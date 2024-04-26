import React, { useState } from 'react';
import { Game } from '../../features/games/types';
import './style.css';
import GameCardContainer from '../../containers/GameCardContainer';



interface GameListProps {
    games: Game[];

}

const GameList: React.FC<GameListProps> = ({ games}) => {

    console.log(`renderGameList`);
    return (
        <div className="game-list">
            {games.map(game => (
                <GameCardContainer key={game.id} game={game} />
            ))}
        </div>
    );
};

export default React.memo(GameList)