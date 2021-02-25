import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/movie';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(arr: Movie[], name: string = ''): Movie[] {
    if (name === '') {
      return arr;
    }
    if (!arr) {
      return arr;
    }

    name = name.toLowerCase();

    return arr.filter((item) => item.name.toLowerCase().includes(name));
  }
}
