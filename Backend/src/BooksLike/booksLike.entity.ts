import { Entity,PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { Members } from "src/Member/members.entity";
import { Books } from "src/Books/books.entity";
import { ObjectType,Field,Int } from "@nestjs/graphql";

@ObjectType()
@Entity()
export class BooksLikes{

    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    like_id:number;

    @Field(()=>Members)
    @ManyToOne(()=>Members,(member)=>member.liked_books,{ onDelete: 'CASCADE' })
    @JoinColumn({name:'member_id'})
    member:Members;

    @Field(()=>Books)
    @ManyToOne(()=>Books,(book)=>book.liked_by_users,{ onDelete: 'CASCADE' })
    book:Books
}