import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './Database/database.module';
import { BooksModule } from './Module/books.module';
import { BooksLikeModule } from './Module/booksLike.module';
import { BooksCategoryModule } from './Module/booksCategory.module';
import { MembersModule } from './Module/members.module';
import { BorrowRecordModule } from './Module/BorrowRecord.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    BooksModule,
    BooksLikeModule,
    BooksCategoryModule,
    MembersModule,
    BooksCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
