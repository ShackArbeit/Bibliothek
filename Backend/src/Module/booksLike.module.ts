import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksLikes } from "src/BooksLike/booksLike.entity";
import { BookLikeService } from "src/BooksLike/booksLike.service";
import { BookLikeResolver } from "src/BooksLike/BooksLike.resolver";
import { MembersModule } from "./members.module";
import { Members } from "src/Member/members.entity";
import { Books } from "src/Books/books.entity";


@Module({
    imports: [TypeOrmModule.forFeature([BooksLikes,Members,Books ]),MembersModule], 
    providers: [BookLikeService , BookLikeResolver], 
})
export class BooksLikeModule{}