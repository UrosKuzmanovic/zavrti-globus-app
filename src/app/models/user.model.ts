export class User{
    [x: string]: any;
    constructor(
        public userID: number,
        public email: string,
        public password: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public role: string
    ){}

    // get token(){}
}