import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(productsArray, searchText) {
    if(!productsArray || !searchText){
      return productsArray;
    }
    //console.log(searchText)
    return productsArray.filter(product => product.productName.toLowerCase().includes(searchText.toLowerCase()))
  }
}
