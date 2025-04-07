import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn,OneToMany } from "typeorm";
import { Publisher } from "src/Publisher/publisher.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";
import { BooksCategroy } from "src/BooksCategory/booksCategory.entity";
import { BooksLikes } from "src/BooksLike/booksLike.entity";

@ObjectType() 
@Entity()
export class Books{
    @Field(() => Int) 
    @PrimaryGeneratedColumn()
    book_id:number

    @Field()
    @Column()
    book_title:string

    @Field(() => Publisher)
    @ManyToOne(()=>Publisher,(publisher)=>publisher.books)
    @JoinColumn({name:'pub_id'})
    publisher:Publisher

    @Field(()=>BooksCategroy)
    @ManyToOne(()=>BooksCategroy,(category) => category.books)
    @JoinColumn({name:'categroy_id'})
    category:BooksCategroy
    
    @Field()
    @Column()
    book_author:string

    @Field()
    @Column({type:'date'})
    pub_date:Date

    @Field(()=>Int)
    @Column()
    human_like:number

    @Field(() => [ BooksLikes])
    @OneToMany(() =>  BooksLikes, (bookLike) => bookLike.book)
    liked_by_users:  BooksLikes[];

    @Field()
    @Column({type:'mediumtext',nullable: true })
    explain: string;
}