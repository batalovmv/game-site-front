import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { Game } from "../../features/games/types";

import GameCard from "../../components/GameCard";
import React from "react";
import { fetchScreens } from "../../features/games/screens";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


const GameCardContainer: React.FC<{ game: Game }> = ({ game }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.games);
    const selectScreensForGame = useMemo(() => {
        return createSelector(
            state => state.screens.screens,
            screens => screens[game.id] || []
        );
    }, [game.id]);
    const screens = useAppSelector(selectScreensForGame);
    const loadScreenshots = useCallback(() => {
        if (screens.length === 0) {
            dispatch(fetchScreens(game.id));
        }
    }, [screens]);

    return <GameCard loading={loading} game={game} screens={screens} getScreens={loadScreenshots} />;
};
export default React.memo(GameCardContainer)