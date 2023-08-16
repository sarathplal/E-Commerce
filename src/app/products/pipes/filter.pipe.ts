import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allProducts: any[], searchKey: string, propertyName: string): any[] {
    const result: any = []
    if (!allProducts || searchKey == "" || propertyName == "") {
      return allProducts;
    }
    allProducts.forEach((item: any) => {
      if (item[propertyName].trim().toLowerCase().includes(searchKey.trim().toLowerCase())) {
        result.push(item)
      }
    })
    return result
  }

}
