import { forwardRef,Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BooksResolver } from "src/Books/books.resolver";
import { BookService } from "src/Books/books.service";
import { Books } from "src/Books/books.entity";
import { PublisherModule } from "./publisher.module";
import { MembersModule } from "./members.module";
import { Members } from "src/Member/members.entity";
import { BooksLikes } from "src/BooksLike/booksLike.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Books]),forwardRef(() => PublisherModule), MembersModule], 
    providers: [BooksResolver, BookService], 
    exports: [TypeOrmModule.forFeature([Books])],
})
export class BooksModule{}
