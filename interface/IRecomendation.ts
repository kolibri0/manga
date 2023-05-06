export interface Jpg {
    image_url: string;
}

export interface Images {
    jpg: Jpg;
}

export interface Entry {
    mal_id: number;
    images: Images;
    title: string;
}

export interface IRecomendation {
    entry: Entry;
}