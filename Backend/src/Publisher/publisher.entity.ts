import { Entity, Column,PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Books } from "src/Books/books.entity";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType() 
@Entity()
export class Publisher {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    pub_id: number;

    @Field()
    @Column()
    pub_name: string;

    @Field()
    @Column()
    pub_address: string;

    @Field(() => [Books]) 
    @OneToMany(() => Books, (book) => book.publisher)
    books: Books[];
}
