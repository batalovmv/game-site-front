export interface FilterParams {
    search?: string;
    ordering?: string;
    platform?: number;
    tags?: string;
    page?: number;     
    page_size?: number;  
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
    genres: GenrData[]
}
interface PlatformData {
    platform: Platform;
    released_at: string;
    requirements: Requirements;
}
interface GenrData {
    id: number;
    name: string;
    games_count: number;
    image_background:string
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
    genres:string[]

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


interface Platform {
    id: number;
    slug: string;
    name: string;
}

interface Requirements {
    minimum: string;
    recommended: string;
}