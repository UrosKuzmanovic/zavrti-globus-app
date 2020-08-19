import { Country } from './country.model';
import { User } from './user.model';
import { Airport } from './airport.model';

export class Trip{
    constructor(
        public tripID: number,
        public city: string,
        public country: Country,
        public price: number,
        public travelDate: Date,
        public returnDate: Date,
        public postDate: Date,
        public airport: Airport,
        public baggage: string,
        public hotel: string,
        public hotelLatitude: number,
        public hotelLongitude: number,
        public meal: string,
        public quote: string,
        public author: string,
        public description: string,
        public imageSrc: string,
        public user: User
    ){}
}