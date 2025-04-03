import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserBorrowRecords } from "src/BorrowRecord/Userborrowrecode.entity";
import { UserBorrowRecordService } from "src/BorrowRecord/Userborrowrecode.service";
import { UserBorrowRecordsResolver } from "src/BorrowRecord/Userborrowrecode.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([UserBorrowRecords ])], 
    providers: [UserBorrowRecordService, UserBorrowRecordsResolver], 
})
export class BorrowRecordModule{}