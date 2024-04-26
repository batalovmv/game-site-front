import { Game, GameData } from "../games/types";

export const transformGameDataToGame = (gameData: GameData): Game => {
    return {
        id: gameData.id,
        title: gameData.name,
        coverImage: gameData.background_image,
        metacritic: gameData.metacritic,
        rating: gameData.rating,
        platforms: gameData.platforms ? gameData.platforms.map(platform => platform.platform.name) : [],
        
    };
};