import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksCategroy } from "src/BooksCategory/booksCategory.entity";
import { BooksCategoryService } from "src/BooksCategory/booksCategory.service";
import { BooksCategoryResolver } from "src/BooksCategory/booksCategory.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([BooksCategroy])], 
    providers: [BooksCategoryService, BooksCategoryResolver], 
})
export class BooksCategoryModule{}