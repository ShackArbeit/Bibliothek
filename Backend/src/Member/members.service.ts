import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Members } from "./members.entity";

@Injectable()
export class MemberService{
    constructor(
        @InjectRepository(Members) private memberRepository:Repository<Members>
    ){}
    async register(
        member_name:string,member_email:string,member_password:string
    ):Promise<Members>{
          const member=new Members();
          member.member_name=member_name;
          member.member_email=member_email;
          member.member_password=member_password;
          await member.hashPassword();
          return this.memberRepository.save(member)
    }
    async findByName(member_name:string):Promise<Members|null>{
          return this.memberRepository.findOne({where:{member_name}})
    }
    async findByEmail(member_email:string):Promise<Members|null>{
          return this.memberRepository.findOne({where:{member_email}})
    }
    async resetPassword(member_email: string, newPassword: string): Promise<boolean> {
        const user = await this.findByEmail(member_email);
        if (!user) {
            throw new Error('電子郵件未註冊');
        }
        user.member_password = newPassword;
        await user.hashPassword();
        await this.memberRepository.save(user)
        return true;
    }
}