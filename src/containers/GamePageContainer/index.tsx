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
import Pagination from 'antd/es/pagination';



const GamePageContainer: React.FC = () => {
    const dispatch = useAppDispatch();
    const { games, loading, error } = useAppSelector((state: RootState) => state.games);
    const { platforms} = useAppSelector((state: RootState) => state.platforms);
    const { setSearchParam } = useQueryParams(); 
    const [pageSize, setPageSize] = useState(20)
    const [page, setPage] = useState(1)
    console.log(`render GamePageContainer`);

   
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const initialFilters = Object.fromEntries(urlParams.entries());
       if (initialFilters.page) {
        setPage(Number(initialFilters.page))
       } 
        dispatch(fetchGames(initialFilters));
        dispatch(fetchPlatforms())
        console.log(`123`, 123);
    }, []);
    
    const handleFilterChange = (updatedFilters: Partial<FilterParams>) => {
        const [key, value] = Object.entries(updatedFilters)[0];
        setSearchParam(key, value.toString());
        dispatch(fetchGames({ ...updatedFilters }));
        setPage(1);
        setPageSize(20)
    };
    const handlePageChange = (page: number, pageSize: number) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('page', page.toString());
        urlParams.set('page_size', pageSize.toString());
        setPageSize(pageSize);
        setPage(page);
        // Обновление URL в адресной строке браузера
        window.history.pushState({}, '', `${window.location.pathname}?${urlParams.toString()}`);

        // Подготовка фильтров для запроса к API
        const updatedFilters = Object.fromEntries(urlParams.entries());
        dispatch(fetchGames(updatedFilters));
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };
    
  

    // Преобразование данных игр для компонента GameList
    const transformedGames = useMemo(() => { 
        return games?.results.map((gameData: GameData) => transformGameDataToGame(gameData));
    }, [games]);
    const placeholderGames: Game[] = useMemo(() => {
        return Array.from({ length: pageSize }, (_, index) => ({
            id: index,
            thumb:'',
            title: `Placeholder Title ${index + 1}`,
            metacritic:0,
            coverImage: '', // Заглушка для изображения обложки
            rating: 0, // Заглушка для рейтинга
            platforms: ['PC', 'Console'], // Заглушка для платформ
            genres:[],
            screens:[],
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
                 {games && (
                     <Pagination
                         current={page}
                         onChange={handlePageChange}
                         total={games.count}
                         pageSize={pageSize}
                         showSizeChanger={true}
                         onShowSizeChange={handlePageChange}
                         pageSizeOptions={['10', '20', '30', '40']}
                     />
                 )}
                 {error && <p>Error: {error}</p>}
              </>
         }
        /> 
           
     
    );
};

export default React.memo(GamePageContainer)