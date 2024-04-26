import { Game, GameData } from "../games/types";

export const transformGameDataToGame = (gameData: GameData): Game => {
    return {
        id: gameData.id,
        title: gameData.name,
        coverImage: gameData.background_image,
        rating: gameData.metacritic,
        platforms: gameData.platforms ? gameData.platforms.map(platform => platform.platform.name) : [],
        multiplayerInfo: {
            online: gameData.tags && gameData.tags.includes('multiplayer'),
            maxPlayers: 4 // Нужно определить логику определения максимального числа игроков
        }
    };
};