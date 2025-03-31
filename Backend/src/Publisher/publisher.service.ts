import { Injectable,NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Publisher } from "./publisher.entity";
import { Books } from "src/Books/books.entity";

@Injectable()
export class PublisherService{
    constructor(
        @InjectRepository(Publisher) private publisherRepository:Repository<Publisher>,
        @InjectRepository(Books) private booksRepository: Repository<Books>
    ){}
    async searchPublisherInformation(query: string ):Promise<Publisher []>{
         const publishers=await this.publisherRepository
            .createQueryBuilder('publisher')
            .leftJoin('publisher.books', 'book')
            .where('publisher.pub_name LIKE :query',{ query: `%${query}%` })
            .orWhere("publisher.pub_id = :queryId", { queryId: isNaN(Number(query)) ? 0 : Number(query) })
            .getMany()
        if (publishers.length===0){
            throw new NotFoundException('該出版社不存在');
        }
        return publishers
    }
    async getBooksPublisher(pub_id:number):Promise<Books[]>{
         return this.booksRepository
                .createQueryBuilder('book')
                .where('book.publisher=:pub_id',{pub_id})
                .select([
                    'book.book.title',
                    'book.book.author'
                ])
                .getMany()
    }
}