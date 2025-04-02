import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/Books/books.entity';
import { Publisher } from 'src/Publisher/publisher.entity';
import { Members } from 'src/Member/members.entity';
import { UserBorrowRecords } from 'src/BorrowRecord/Userborrowrecode.entity';
import { BooksCategroy } from 'src/BooksCategory/booksCategory.entity';
import { BooksLikes } from 'src/BooksLike/booksLike.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'wang8119',
      database: 'library',
      entities: [
        Books, 
        Publisher, 
        Members, 
        UserBorrowRecords,
        BooksCategroy,
        BooksLikes 
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Books, Publisher, Members, UserBorrowRecords,BooksLikes]),
  ],
  exports: [TypeOrmModule], 
})
export class DatabaseModule {}