export class ForwardReservationModel {
    hotelName: string;
    address: string;
    luggageDetails: string | LuggageDetails;
    name: string;
    email: string;
    phoneNumber: string;
    transferType: string;
    paymentType: "cash" | "card" | string;
    pickUpDate: string;
    transferTime?: string;
    passengerCount: number;
    mailTo: string;
  }

  export interface LuggageDetails {
    suitCase: number;
    bike: number;
    ski: number;
    snowboard: number;
    babySeat: number;
    boosterSeat: number;
    specificRequest: string;
  }