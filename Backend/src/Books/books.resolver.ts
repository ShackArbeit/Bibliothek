import { Resolver, Query,Args } from '@nestjs/graphql';
import { BookService } from './books.service';
import { Books } from './books.entity'

@Resolver(() => Books)
export class BooksResolver {
   constructor(private readonly bookService:BookService ){}
   @Query(()=>[Books],{name:'searchBooks'})
   async searchBooks(@Args("query") query:string):Promise<Books[]>{
          return this.bookService.searchBooks(query)
   }
}