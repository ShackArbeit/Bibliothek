import { Entity,Column,PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";
import { Publisher } from "src/Publisher/publisher.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

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
    
    @Field()
    @Column()
    book_author:string

    @Field()
    @Column({type:'date'})
    pub_date:Date

    @Field(()=>Int)
    @Column()
    human_like:number

    @Field()
    @Column({ nullable: true })
    remark: string;
}