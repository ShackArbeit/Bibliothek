import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksLikes } from "src/BooksLike/booksLike.entity";
import { BookLikeService } from "src/BooksLike/booksLike.service";
import { BookLikeResolver } from "src/BooksLike/BooksLike.resolver";


@Module({
    imports: [TypeOrmModule.forFeature([BooksLikes ])], 
    providers: [BookLikeService , BookLikeResolver], 
})
export class BooksLikeModule{}