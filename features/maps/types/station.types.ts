export interface FuelTypes{
    type:"PETROL"|"DIESEL";
    availableFuel:number;

}
export interface Station{
    id:string;
    name:string;
    latitude:number;
    longitude:number;
    queueCount:number;
    fuelTypes:FuelTypes[];
    status:"LOW_FUEL"|"HIGH_FUEL"
}