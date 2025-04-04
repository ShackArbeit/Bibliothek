import { Resolver, Query,Args } from '@nestjs/graphql';
import { BooksCategoryService } from './booksCategory.service';
import { BooksCategroy } from './booksCategory.entity';
import { Books } from 'src/Books/books.entity';

@Resolver(() => Books)
export class BooksCategoryResolver{
     constructor(
        private readonly bookCategoryService:BooksCategoryService
     ){}
     @Query(()=>[Books],{name:'searchByCategory'})
     async searchByCategory(
          @Args('query') query:string
     ):Promise<Books[]>{
          return this.bookCategoryService.getBooksByCategory(query)
     }
}