import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksResolver } from "src/Books/books.resolver";
import { BookService } from "src/Books/books.service";
import { Books } from "src/Books/books.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Books])], 
    providers: [BooksResolver, BookService], 
})
export class BooksModule{}
