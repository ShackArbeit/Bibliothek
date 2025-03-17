import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserBorrowRecords } from 'src/BorrowRecord/Userborrowrecode.entity';
import { ObjectType, Field, Int } from "@nestjs/graphql";

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
}