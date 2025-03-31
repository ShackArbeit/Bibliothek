import { Resolver,Mutation,Args } from "@nestjs/graphql";
import { Members } from "./members.entity";
import { MemberService } from "./members.service";
import { AuthService } from "src/Auth/auth.service";

@Resolver(()=>Members)
export class MembersResolver{
    constructor(
        private readonly memberService:MemberService,
        private readonly authService:AuthService
    ){}
    @Mutation(()=>Members)
    async register(
        @Args('member_name') member_name:string,
        @Args('member_email') member_email: string,
        @Args('member_password') member_password: string
    ):Promise<Members>{
          return this.memberService.register(member_name,member_email,member_password)
    }
    @Mutation(() => String)
    async login(
        @Args('identifier') identifier: string,
        @Args('password') password: string
    ):Promise<{access_token:string}>{
          return this.authService.login(identifier,password)
    } 
    @Mutation(() => Boolean)
    async resetPassord(
        @Args('member_email') member_email: string,
        @Args('newPassword') newPassword: string
    ):Promise<boolean>{
         return this.memberService.resetPassword(member_email,newPassword)
    }
}