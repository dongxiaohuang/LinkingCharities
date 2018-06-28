import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(items: any[], criterias: any): any[] {
       // if filter location
    if(!items) return [];
    if(criterias.location.length > 0){
         items = items.filter(
              item => {return criterias.location.includes(item.location);});
    }
    // if filter categories
    if(criterias.categories.length > 0){
         items = items.filter(
             (item) => {
                  for(let i in item.labels){
                       if(criterias.categories.includes(item.labels[i])){
                            return item;
                       }
                  }
             }
         )
    }
    if(criterias.rating.length > 0){
         items = items.filter(
              // TODO:bug
              item => criterias.rating.includes(item.comments[0].rating)
         )
    }

    return items;
  }

}
