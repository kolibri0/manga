export interface Jpg {
    image_url: string;
}
export interface Images {
    jpg: Jpg;
}
export interface Genre {
    name: string;
}
export interface mangaHome {
    mal_id: number;
    images: Images;
    title: string;
    type: string;
    chapters: number;
    score: number;
    genres: Genre[];
}

export {}