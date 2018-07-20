import { Comment } from './comment';
import { Card } from './card';
import { Category } from './category';
import { Geocoding } from './geocoding';
export class Charity {
     _id: string;
     ccn: number;
     rbody:string;
     rno:string;
     name: string;
     categories: Category[];
     tel:number;
     web:string;
     email:string;
     image: string;
     info: string;
     details:string;
     postcode:string;
     country:string;
     state:string;
     city: string;
     averageRating: number;
     address: string;
     card: Card;
     comments: Comment[];
     geocoding:Geocoding;
     geoaddress:string;
};

export class CharityIdName{
     constructor(
          id: string,
          name: string
     ){}
};
