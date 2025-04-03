import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Books } from "src/Books/books.entity";
import { UserBorrowRecords } from "./Userborrowrecode.entity";

@Injectable()
export class UserBorrowRecordService {
    constructor(
        @InjectRepository(UserBorrowRecords) 
        private userBorrowRepository: Repository<UserBorrowRecords>,

        @InjectRepository(Books) 
        private booksRepository: Repository<Books>,
    ) {}

    // 讓單一讀者查詢自己借了哪些書 (多本)
    async findOneUserBorrowAllRecords(memberId: number): Promise<UserBorrowRecords[]> {
        const memberRecords = await this.userBorrowRepository.find({
            where: { borrower: { member_id: memberId } }, 
            relations: ["which_book"] 
        });
        if (memberRecords.length === 0) {
            throw new Error("該會員不存在或沒有借書紀錄");
        }   
        return memberRecords;
    }
    // 讓所有讀者查詢單一書本被幾個讀者借閱過
    async findOneBookBorrowedByAllUsers(bookId: number): Promise<UserBorrowRecords[]> {
        const bookRecords = await this.userBorrowRepository.find({
            where: { which_book: { book_id: bookId } }, 
            relations: ["borrower"] // 確保關聯的讀者資訊也載入
        });

        if (bookRecords.length === 0) {
            throw new Error("該書本不存在或沒被借閱過");
        }

        return bookRecords;
    }
}
