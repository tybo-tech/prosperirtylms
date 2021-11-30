import { Pipe, PipeTransform } from '@angular/core';
import { CardModel } from 'src/models/card.model';

@Pipe({
  name: 'sliderwidgetpipe'
})
export class HomesliderwidgetpipePipe implements PipeTransform {

 
  transform(items: CardModel[], val: any): any {

    if (!val) { return items; }
    if (!items) { return []; }
    return items.filter(x =>
      x.Name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      || (x.Description || '').includes(val)
      || (x.Id || '') === val

    );
  }

}
