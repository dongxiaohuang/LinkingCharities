import { Comment } from './comment';
export class Charity {
     _id: string;
     name: string;
     labels: string[];
     image: string;
     info: string;
     location: string;
     rating: number;
     city: string;
     address: string;
     comments: Comment[];
};

export class CharityIdName{
     constructor(
          id: string,
          name: string
     ){}
};
