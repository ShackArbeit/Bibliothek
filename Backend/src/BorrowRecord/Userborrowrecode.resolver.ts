import { Resolver,Query,Args } from "@nestjs/graphql";
import { UserBarrowRecordService } from "./Userborrowrecode.service";
import { UserBorrowRecords} from "./Userborrowrecode.entity";

@Resolver(()=>UserBorrowRecords)
export class UserBorrowRecordsResolver{
    constructor(private readonly userBorrowService:UserBarrowRecordService){}
    // 查詢單一讀者自己的所有借閱書本記錄
    @Query(()=>[UserBorrowRecords], { name: "findOneUserBorrowAllRecords" })
    async findOneUserBorrowAllRecords(
        @Args('memberId') memberId:number
    ):Promise<UserBorrowRecords[]>{
          return this.userBorrowService.findOneUserBorrowAllRecords(memberId)
    }
    // 查詢單一書本被所有讀者借閱的紀錄
    @Query(()=>[UserBorrowRecords],{name: "findOneBookBorrowedByAllUsers" })
    async findOneBookBorrowedByAllUsers(
        @Args('bookId') bookId:number
    ):Promise<UserBorrowRecords[]> {
         return this.userBorrowService.findOneBookBorrowedByAllUsers(bookId)
    }
}