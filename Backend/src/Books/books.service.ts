import { Injectable } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { Like} from "typeorm";
import { Repository } from "typeorm";
import { Books} from "./books.entity";
import { Publisher } from "src/Publisher/publisher.entity";
import { Members } from "src/Member/members.entity";
import { BooksLikes } from "src/BooksLike/booksLike.entity";

@Injectable()
export class BookService{
    constructor
    (
      @InjectRepository(Books) private booksRepository:Repository<Books>,
      @InjectRepository(Publisher) private publisherRepository:Repository<Publisher>,
      @InjectRepository(Members) private memberRepository:Repository<Members>,
      @InjectRepository(BooksLikes) private booksLikeRepository:Repository<BooksLikes>
    ){
    }
    async searchBooks(query: string): Promise<Books[]>{
        const publishers = await this.publisherRepository.find({
            where: { pub_name: Like(`%${query}%`) },
          });
        const pubIds=publishers.map((publisher)=>publisher.pub_id);
        const queryBuilder=this.booksRepository.createQueryBuilder('book')
                           .leftJoinAndSelect('book.publisher', 'publisher')   
                           .where('book.book_title LIKE :query', { query: `%${query}%` })
                           .orWhere('book.book_author LIKE :query', { query: `%${query}%` })
        // const whereConditions:any[]=[
        //     {book_title:Like(`%${query}%`)},
        //     {book_author:Like(`%${query}%`)},
        // ]  
        // if(pubIds.length>0){
        //      whereConditions.push({ publisher: { pub_id: In(pubIds) } })
        //  }
        // return this.booksRepository.find({
        //     where: whereConditions,
        //     relations: ["publisher"],
        // })
        if (pubIds.length > 0) {
           queryBuilder.orWhere('publisher.pub_id IN (:...pubIds)', { pubIds });
      }
        return queryBuilder.getMany()
    } 
}