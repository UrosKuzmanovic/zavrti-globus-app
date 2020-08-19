export class FetchedTrip{
    constructor(
        public tripID: number,
        public city: string,
        public countryID: number,
        public countryName: string,
        public price: number,
        public travelDate: Date,
        public returnDate: Date,
        public airportID: number,
        public airportName: string,
        public baggage: string,
        public hotel: string,
        public hotelLatitude: number,
        public hotelLongitude: number,
        public meal: string,
        public quote: string,
        public author: string,
        public description: string,
        public imageSrc: string,
        public userID: number,
        public firstName: string,
        public lastName: string,
        public admin: number,
    ){}
}