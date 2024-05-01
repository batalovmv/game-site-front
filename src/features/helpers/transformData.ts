import { Game, GameData } from "../games/types";

export const transformGameDataToGame = (gameData: GameData): Game => {
    return {
        id: gameData.id,
        title: gameData.name,
        coverImage: gameData.background_image,
        thumb: gameData.thumb,
        screens: gameData.screens,
        metacritic: gameData.metacritic,
        rating: gameData.rating,
        platforms: gameData.platforms ? gameData.platforms.map(platform => platform.platform.name) : [],
        genres: gameData.genres ? gameData.genres.map(genr => genr.name):[]

        
    }
}