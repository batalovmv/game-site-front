// GamePageContainer.tsx

import React, { useEffect } from 'react';

import { fetchGames } from '../../features/games/slice';
import { FilterParams, GameData } from '../../features/games/types';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterBar from '../../components/FilterBar';
import PlatformFilter from '../../components/PlatformFilter';
import MultiplayerFilter from '../../components/MultiplayerFilter';
import GameList from '../../components/GameList';
import { transformGameDataToGame } from '../../features/helpers/transformData';



const GamePageContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { games, loading, error, filters } = useAppSelector((state: RootState) => state.games);

    useEffect(() => {
        dispatch(fetchGames(filters));
    }, [dispatch, filters]);

    const handleFilterChange = (updatedFilters: Partial<FilterParams>) => {
        // Обновление фильтров и повторная загрузка данных
        dispatch(fetchGames({ ...filters, ...updatedFilters }));
    };

    // Преобразование данных игр для компонента GameList
    const transformedGames = games?.results.map((gameData: GameData) => transformGameDataToGame(gameData));

    return (
        <div>
            <FilterBar
                onFilterChange={(filterValue) => handleFilterChange({ search: filterValue })}
                onSortChange={(sortType) => handleFilterChange({ ordering: sortType })}
            />
            <PlatformFilter
                onPlatformSelect={(platform) => handleFilterChange({ platforms: platform })}
            />
            <MultiplayerFilter
                onMultiplayerSelect={(type) => handleFilterChange({ tags: type })}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {transformedGames && <GameList games={transformedGames} showScreenshots={true} />}
        </div>
    );
};

export default GamePageContainer;