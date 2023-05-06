export interface Jpg {
    image_url: string;
}
export interface Images {
    jpg: Jpg;
}
export interface Character {
    mal_id: number;
    images: Images;
    name: string;
}
export interface ICharacter {
    character: Character;
    role: string;
}