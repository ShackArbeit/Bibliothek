import { Injectable,NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Publisher } from "./publisher.entity";

@Injectable()
export class PublisherService{
    constructor(
        @InjectRepository(Publisher) private publisherRepository:Repository<Publisher>
    ){}
    async searchPublisherInformation(query: string ):Promise<Publisher []>{
         const publishers=await this.publisherRepository
            .createQueryBuilder('publisher')
            .leftJoin('publisher.books', 'book')
            .where('publisher.pub_name LIKE :query',{ query: `%${query}%` })
            .orWhere("publisher.pub_id = :queryId", { queryId: isNaN(Number(query)) ? 0 : Number(query) })
            .select([
                "publisher.pub_id",
                "publisher.pub_name",
                "publisher.pub_address",
                "book.book_title",
                "book.book_author",
            ])
            .getMany()
        if (publishers.length===0){
            throw new NotFoundException('該出版社不存在');
        }
        return publishers
    }
}