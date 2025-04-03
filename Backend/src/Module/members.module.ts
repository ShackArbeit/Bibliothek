import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Members } from "src/Member/members.entity";
import { MemberService } from "src/Member/members.service";
import { MembersResolver } from "src/Member/members.resolver";

@Module({
    imports: [TypeOrmModule.forFeature([Members])], 
    providers: [MemberService, MembersResolver], 
})
export class MembersModule{}
