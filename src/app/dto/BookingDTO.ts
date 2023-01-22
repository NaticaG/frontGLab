import { Booking } from "../entity/Booking";
import { Person } from "../entity/Person";

export class BookingDTO {
    client: Person;
    booking: Booking;

    constructor(){
        this.client = new Person();
        this.booking = new Booking();
    }
}