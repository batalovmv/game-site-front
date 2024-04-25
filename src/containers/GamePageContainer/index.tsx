// GamePageContainer.tsx

import React, { useEffect } from 'react';

import { fetchGames, fetchScreens } from '../../features/games/slice';
import { FilterParams, GameData } from '../../features/games/types';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterBar from '../../components/FilterBar';
import PlatformFilter from '../../components/PlatformFilter';
import MultiplayerFilter from '../../components/MultiplayerFilter';
import GameList from '../../components/GameList';
import { transformGameDataToGame } from '../../features/helpers/transformData';
import { useQueryParams } from '../../features/hooks/useQueryParams';



const GamePageContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { games, loading, error } = useAppSelector((state: RootState) => state.games);
    const { setSearchParam, updateSearchParams } = useQueryParams(); 

    useEffect(() => {
        console.log(`render`);
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilters = Object.fromEntries(urlParams.entries());
        dispatch(fetchGames(initialFilters));
    }, []);

    const handleFilterChange = (updatedFilters: Partial<FilterParams>) => {
        const [key, value] = Object.entries(updatedFilters)[0];
        setSearchParam(key, value.toString());
        dispatch(fetchGames({ ...updatedFilters }));
    };
    const handleGetScreens = (id: number)=>{
         
        return dispatch(fetchScreens(id))
    }

  

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
            {transformedGames && <GameList getScreens={handleGetScreens} games={transformedGames} />}
        </div>
    );
};

export default GamePageContainer;