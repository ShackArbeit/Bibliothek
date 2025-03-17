import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Books } from 'src/Books/books.entity';
import { Members } from 'src/Member/member.entity';
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class UserBorrowRecords{

    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    user_borrow_id:number

    @Field()
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    user_borrow_at: Date;

    @Field(()=>Books)
    @ManyToOne(()=>Books, (book)=>book.book_id)
    @JoinColumn({ name: 'book_id' })
    which_book: Books;

    @Field(()=>Members)
    @ManyToOne(()=>Members, (member)=>member.borrow_records)
    @JoinColumn({ name: 'member_id' })
    borrower: Members;
}
