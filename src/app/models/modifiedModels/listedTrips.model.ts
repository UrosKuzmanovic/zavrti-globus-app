export class ListedTrip {
    constructor(
        public tripID: number, 
        public city: string,
        public countryID: number, 
        public countryName: string, 
        public travelDate: Date, 
        public returnDate: Date, 
        public price: number,
        public imageSrc: string) { }
}