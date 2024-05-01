import {  useAppSelector } from "../../app/hooks";
import { Game } from "../../features/games/types";
import GameCard from "../../components/GameCard";
import React from "react";
import { RootState } from "../../app/store";


const GameCardContainer: React.FC<{ game: Game }> = ({ game }) => {
    const { loading } = useAppSelector((state: RootState) => state.games);
    console.log(`render GameCardContainer`);
  
 
    return <GameCard loading={loading} game={game}  />;
};
export default React.memo(GameCardContainer)