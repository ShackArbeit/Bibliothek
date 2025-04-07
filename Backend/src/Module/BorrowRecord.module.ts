import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBorrowRecords } from "src/BorrowRecord/Userborrowrecode.entity";
import { UserBorrowRecordService } from "src/BorrowRecord/Userborrowrecode.service";
import { UserBorrowRecordsResolver } from "src/BorrowRecord/Userborrowrecode.resolver";
import { BooksModule } from "./books.module";
import { Members } from "src/Member/members.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserBorrowRecords,Members ]),BooksModule], 
    providers: [UserBorrowRecordService, UserBorrowRecordsResolver], 
})
export class BorrowRecordModule{}