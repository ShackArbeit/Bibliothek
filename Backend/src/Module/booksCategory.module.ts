import { forwardRef,Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksCategroy } from "src/BooksCategory/booksCategory.entity";
import { BooksCategoryService } from "src/BooksCategory/booksCategory.service";
import { BooksCategoryResolver } from "src/BooksCategory/booksCategory.resolver";
import { BooksModule } from "./books.module";

@Module({
    imports: [TypeOrmModule.forFeature([BooksCategroy]),forwardRef(() => BooksModule)], 
    providers: [BooksCategoryService, BooksCategoryResolver], 
})
export class BooksCategoryModule{}