import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserBorrowRecords } from 'src/BorrowRecord/Userborrowrecode.entity';
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BooksLikes } from 'src/BooksLike/booksLike.entity';
import * as bcrypt from 'bcrypt'

@ObjectType()
@Entity()
export class Members{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    member_id:number
    
    @Field()
    @Column()
    member_name:string

    @Field()
    @Column()
    member_password:string

    @Field()
    @Column()
    member_email:string;

    @Field()
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    sign_up_date:Date

    @Field(()=>[UserBorrowRecords])
    @OneToMany(()=>UserBorrowRecords, (borrow_record)=>borrow_record.borrower)
    borrow_records:UserBorrowRecords[]


    @Field(() => [BooksLikes])
    @OneToMany(() => BooksLikes, (bookLike) => bookLike.member)
    liked_books: BooksLikes[];

    async hashPassword(){
        this.member_password=await bcrypt.hash(this.member_password,10)
    }
    async comparePassword(password:string):Promise<boolean>{
        return bcrypt.compare(password,this.member_password)
    }
}