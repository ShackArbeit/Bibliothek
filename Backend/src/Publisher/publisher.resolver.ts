import { Resolver,Query,Args,ResolveField,Parent } from "@nestjs/graphql";
import { Publisher } from "./publisher.entity";
import { PublisherService } from "./publisher.service";
import { Books } from "src/Books/books.entity";

@Resolver(()=>Publisher)
export class PublisherResolver{
    constructor(
        private readonly publisherService:PublisherService
    ){}
    @Query(()=>[Publisher],{name:'getAllPublisherInformation'})
    async getAllPublisherInfo(
        @Args('query') query:string
    ):Promise<Publisher[]>{
        return this.publisherService.searchPublisherInformation(query)
    }
    @ResolveField(()=>[Books])
    async books(@Parent() publisher:Publisher):Promise<Books[]>{
        return this.publisherService.getBooksPublisher(publisher.pub_id)
    }
}