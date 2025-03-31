import { Injectable,UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MemberService } from "src/Member/members.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly membrService:MemberService,
        private readonly jwtService:JwtService
    ){}
    async vaildateUser(
        identifer:string,password:string
    ):Promise<any>{
         const user=await this.membrService.findByName(identifer) || await this.membrService.findByEmail(identifer);
         if(user && await user.comparePassword(password)){
             return user;
         }else{
             throw new UnauthorizedException('帳戶或密碼錯誤')
         }
    }
    async login(
        identifer:string,password:string
    ):Promise<{access_token:string}>{
         const user=await this.vaildateUser(identifer,password);
         const payload={member_id:user.member_id,member_name:user.member_name};
         return {access_token:this.jwtService.sign(payload)}
    }
}