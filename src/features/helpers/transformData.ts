import { Game, GameData } from "../games/types";

export const transformGameDataToGame = (gameData: GameData): Game => {
    return {
        id: gameData.id,
        title: gameData.name,
        coverImage: gameData.background_image,
        screenshots: [], // Указать логику для скриншотов, если они доступны
        rating: gameData.metacritic,
        platforms: gameData.platforms.map(platform => platform.platform.name),
        multiplayerInfo: {
            online: gameData.tags.includes('multiplayer'), // Пример, проверить правильность
            maxPlayers: 4 // Пример, нужно определить логику
        }
    };
};