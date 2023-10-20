import { Author, Awards, Genre } from '../../../prisma/generated/client';

export class BookDto {
  title: string;
  isbn: string;
  publicationDate: Date;
  numberOfPages: number;
  language: string;
  image: string;
  description: string;
  publisher: string;
  publicationCountry: string;
  binding: string | undefined;
  authors: Author[];
  genres: Genre[];
  awards?: Awards[];
}
