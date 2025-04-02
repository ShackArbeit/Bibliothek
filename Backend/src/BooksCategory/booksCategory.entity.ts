import { Entity,Column,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { ObjectType,Field,Int } from "@nestjs/graphql";
import { Books } from "src/Books/books.entity";

@ObjectType()
@Entity()
export class BooksCategroy{
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    categroy_id:number;

    @Field()
    @Column()
    category_name:string;

    @Field(()=>[Books])
    @OneToMany(()=>Books,(book)=>book.category)
    books:Books[];
    
}