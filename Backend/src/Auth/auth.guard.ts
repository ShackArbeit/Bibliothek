import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { CanActivate } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;

        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('請提供有效的 JWT Token');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = this.jwtService.verify(token);
            request.user = decoded; // 解碼後的 payload（member_id, member_name）
            return true;
        } catch (error) {
            throw new UnauthorizedException('JWT Token 驗證失敗');
        }
    }
}
