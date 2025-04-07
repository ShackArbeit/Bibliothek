import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/Auth/auth.service';
import { MemberService} from 'src/Member/members.service';
import { Members } from 'src/Member/members.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Members]), 
      JwtModule.register({
        secret: 'your-secret-key', 
        signOptions: { expiresIn: '1d' },
      }),
    ],
    providers: [AuthService, MemberService],
    exports: [AuthService],
  })
  export class AuthModule {}
