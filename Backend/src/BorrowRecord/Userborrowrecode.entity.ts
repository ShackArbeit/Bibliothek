import { Entity, 
    PrimaryGeneratedColumn, 
    PrimaryColumn,
    Column, ManyToOne 
    ,JoinColumn } from 'typeorm';
import { Books } from 'src/Books/books.entity';
import { Members } from 'src/Member/members.entity';
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class UserBorrowRecords{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    borrow_id: number;

    @Field()
    @Column({type:'timestamp',default:()=>'CURRENT_TIMESTAMP'})
    user_borrow_at: Date;

    @Field(()=>Books)
    @ManyToOne(()=>Books, (book)=>book.book_id,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    which_book: Books;

    @Field(()=>Members)
    @ManyToOne(()=>Members, (member)=>member.borrow_records,{ onDelete: 'CASCADE' })
    @JoinColumn({ name: 'member_id' })
    borrower: Members;
}
