// GamePageContainer.tsx

import React, { useEffect, useMemo, useState } from 'react';


import { FilterParams, Game, GameData } from '../../features/games/types';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FilterBar from '../../components/FilterBar';
import PlatformFilter from '../../components/PlatformFilter';
import MultiplayerFilter from '../../components/MultiplayerFilter';
import GameList from '../../components/GameList';
import { transformGameDataToGame } from '../../features/helpers/transformData';
import { useQueryParams } from '../../features/hooks/useQueryParams';
import MainPage from '../../pages/gameList';
import { fetchGames } from '../../features/games/list/slice';
import { fetchPlatforms } from '../../features/games/platforms/slice';



const GamePageContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { games, loading, error } = useAppSelector((state: RootState) => state.games);
    const { platforms} = useAppSelector((state: RootState) => state.platforms);
    const { setSearchParam, updateSearchParams } = useQueryParams(); 
    const [pageSize, setPageSize] = useState(20)

    useEffect(() => {
        console.log(`renderGamePAgeStart`);
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilters = Object.fromEntries(urlParams.entries());
        dispatch(fetchGames(initialFilters));
        dispatch(fetchPlatforms())
    }, []);
    
    const handleFilterChange = (updatedFilters: Partial<FilterParams>) => {
        console.log(`renderFilgerChange`);
        const [key, value] = Object.entries(updatedFilters)[0];
        setSearchParam(key, value.toString());
        dispatch(fetchGames({ ...updatedFilters }));
    };
  

  console.log(`renderGamePage` );

    // Преобразование данных игр для компонента GameList
    const transformedGames = useMemo(() => { 
        console.log(`renderGamePagetransformedGames`);
        return games?.results.map((gameData: GameData) => transformGameDataToGame(gameData));
    }, [games]);
    const placeholderGames: Game[] = useMemo(() => {
        return Array.from({ length: pageSize }, (_, index) => ({
            id: index,
            title: `Placeholder Title ${index + 1}`,
            coverImage: '', // Заглушка для изображения обложки
            rating: 0, // Заглушка для рейтинга
            platforms: ['PC', 'Console'], // Заглушка для платформ
            multiplayerInfo: {
                online: false,
                maxPlayers: 0
            }
        }));
    }, [pageSize])
    return (
        <MainPage 
         leftChildren={
                <>
                    <FilterBar
                        onFilterChange={(filterValue) => handleFilterChange({ search: filterValue })}
                        onSortChange={(sortType) => handleFilterChange({ ordering: sortType })}
                    />
                    {platforms && <PlatformFilter
                        platforms={platforms}
                        onPlatformSelect={(platform) => handleFilterChange({ platform: platform })}
                    />}
                   
                    <MultiplayerFilter
                        onMultiplayerSelect={(type) => handleFilterChange({ tags: type })}
                    />
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </>
         }
         rightChildren={
            <>
                 {loading && <GameList games={placeholderGames} />}
                 {!loading && transformedGames && <GameList games={transformedGames} />}
                 {error && <p>Error: {error}</p>}
              </>
         }
        /> 
           
     
    );
};

export default React.memo(GamePageContainer)