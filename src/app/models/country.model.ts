import { Continent } from './continent.model';

export class Country{
    constructor(
        public countryID: number,
        public name: string,
        public continent: Continent,
        public flagSrc: string
    ){}
}