import { Resolver, Query, Args, ResolveField, Parent } from "@nestjs/graphql";
import { UserBarrowRecordService } from "./Userborrowrecode.service";
import { UserBorrowRecords } from "./Userborrowrecode.entity";
import { Books } from "src/Books/books.entity";
import { Members } from "src/Member/members.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Resolver(() => UserBorrowRecords)
export class UserBorrowRecordsResolver {
    constructor(
        private readonly userBorrowService: UserBarrowRecordService,
        @InjectRepository(Books) private booksRepository: Repository<Books>,
        @InjectRepository(Members) private membersRepository: Repository<Members>,
    ) {}

    // 查詢單一讀者自己的所有借閱書本記錄
    @Query(() => [UserBorrowRecords], { name: "findOneUserBorrowAllRecords" })
    async findOneUserBorrowAllRecords(@Args('memberId') memberId: number): Promise<UserBorrowRecords[]> {
        return this.userBorrowService.findOneUserBorrowAllRecords(memberId);
    }

    // 查詢單一書本被所有讀者借閱的紀錄
    @Query(() => [UserBorrowRecords], { name: "findOneBookBorrowedByAllUsers" })
    async findOneBookBorrowedByAllUsers(@Args('bookId') bookId: number): Promise<UserBorrowRecords[]> {
        return this.userBorrowService.findOneBookBorrowedByAllUsers(bookId);
    }

    // 使用 @ResolveField 延遲加載 which_book (書籍資訊)
    @ResolveField(() => Books,{ nullable: true })
    async which_book(@Parent() userBorrowRecord: UserBorrowRecords): Promise<Books|null> {
        return this.booksRepository.findOne({ where: { book_id: userBorrowRecord.which_book.book_id } });
    }

    // 使用 @ResolveField 延遲加載 borrower (會員資訊)
    @ResolveField(() => Members,{ nullable: true })
    async borrower(@Parent() userBorrowRecord: UserBorrowRecords): Promise<Members|null> {
        return this.membersRepository.findOne({ where: { member_id: userBorrowRecord.borrower.member_id } });
    }
}
