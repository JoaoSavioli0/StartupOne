export class confirmCondoInfo{
    id!: number;
    name!: string;
    address: string = ""
}

export class BookingInfo{
    id!: number;
    name!: string;
    startWorkingDay!: string;
    stopWorkingDay!: string;
    startWorkingTime!: string;
    stopWorkingTime!: string;
}

export class bookingTime{
    id! : number;
    from!: number;
    till!: number;
}