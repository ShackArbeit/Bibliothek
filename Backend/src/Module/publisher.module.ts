import { forwardRef,Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Publisher } from "src/Publisher/publisher.entity";
import { PublisherService } from "src/Publisher/publisher.service";
import { PublisherResolver } from "src/Publisher/publisher.resolver";
import { BooksModule } from "./books.module";

@Module({
    imports: [TypeOrmModule.forFeature([ Publisher]),forwardRef(() => BooksModule)], 
    providers: [PublisherService, PublisherResolver], 
    exports: [TypeOrmModule.forFeature([Publisher])],
})
export class PublisherModule{}
