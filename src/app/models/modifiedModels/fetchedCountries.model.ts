export class FetchedCountries{
    constructor(
        public countryID: number,
        public countryName: string,
        public flagSrc: string,
        public continentID: number,
        public continentName: string
    ){}
}