import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Game } from "../../features/games/types";

import GameCard from "../../components/GameCard";
import React from "react";
import { fetchScreens } from "../../features/games/screens";
import { createSelector } from "@reduxjs/toolkit";


const GameCardContainer: React.FC<{ game: Game }> = ({ game }) => {
    const dispatch = useAppDispatch();
    const selectScreensForGame = useMemo(() => {
        return createSelector(
            state => state.screens.screens,
            screens => screens[game.id] || []
        );
    }, [game.id]);
    const screens = useAppSelector(selectScreensForGame);
    console.log(`renderGAmeCardCOntsiner`);
    console.log(`screens`, screens);
    const loadScreenshots = useCallback(() => {
        if (screens.length === 0) {
            console.log(`dispatching`);
            dispatch(fetchScreens(game.id));
        }
    }, [screens]);

    return <GameCard game={game} screens={screens} getScreens={loadScreenshots} />;
};
export default React.memo(GameCardContainer)