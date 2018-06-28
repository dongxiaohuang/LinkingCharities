export class Charity {
     _id: string;
     name: string;
     label: string[];
     image: string;
     info: string;
     location: string;
     rating: number;
};

export class CharityIdName{
     constructor(
          id: string,
          name: string
     ){}
};
