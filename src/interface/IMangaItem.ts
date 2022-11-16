export interface Jpg {
    image_url: string;
}

export interface Images {
    jpg: Jpg;
}
export interface From {
    day: number;
    month: number;
    year: number;
}
export interface To {
    day: number;
    month: number;
    year: number;
}
export interface Prop {
    from: From;
    to: To;
}
export interface Published {
    from: Date;
    to: Date;
    prop: Prop;
    string: string;
}
export interface Genre {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface IMangaItem {
    mal_id: number;
    images: Images;
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    chapters: number;
    status: string;
    published: Published;
    score: number;
    synopsis: string;
    background: string;
    genres: Genre[];
}
