export interface FilterParams {
    page?: number;
    page_size?: number;
    search?: string;
    platform?: number;
    tags?: string; // singleplayer,multiplayer
    language?: string;
    ordering?: string;
}
export interface platform {
    id: number
    name: string,
    games_count?: number

}
//нужно добавить пункт про офлайн - онлайн
export interface GameData {
    id: number;
    name: string;
    released: string;
    background_image: string;
    metacritic: number;
    rating:number;
    platforms: PlatformData[];
    tags: string[];
    languages: string[];
}
export interface tags{
    id: number,
    name: string,
    slug: string,
    language: string,
    games_count: number,
    image_background: string
     
}
export interface ScreenShot{
    id:number
    image:string
}
export interface Game {
    id: number;
    title: string;
    coverImage: string;
    screenshots?: string[];
    rating: number;
    metacritic:number;
    platforms: string[];
    multiplayerInfo: {
        online: boolean;
        maxPlayers: number;
    };
}


export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: GameData[];
}

export interface GameCardProps {
    game: GameData;
}
interface PlatformData {
    platform: Platform;
    released_at: string;
    requirements: Requirements;
}

interface Platform {
    id: number;
    slug: string;
    name: string;
}

interface Requirements {
    minimum: string;
    recommended: string;
}