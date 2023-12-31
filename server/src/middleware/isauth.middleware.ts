import {
	NestMiddleware,
	UnauthorizedException,
	Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

interface Body {
	operationName: string | null;
	variables: any;
	query: string;
}

declare module 'express' {
	interface Request {
		user: { sub: string };
		cookies: { token: string };
	}
}

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
	constructor(private jwt: JwtService, private config: ConfigService) {}

	async use(req: Request, _res: Response, next: (error?: any) => void) {
		const { query }: Body = req.body;
		if (
			// for query/mutation exclusion from auth checking
			query &&
			!query.includes('IntrospectionQuery') &&
			!this.excluded('login', 'register', 'hello').test(query)
		) {
			const auth = req.headers.authorization;
			let token: string;
			if (!auth || !(token = auth.split(' ')[1])) {
				throw new UnauthorizedException();
			} else {
				try {
					const payload = await this.jwt.verifyAsync(token, {
						secret: this.config.get('JWT_ACCESS_SECRET')
					});
					req['user'] = payload;
				} catch (e) {
					throw new UnauthorizedException(e);
				}
			}
		}
		next();
	}
	private excluded(...arr: string[]) {
		return new RegExp('(' + arr.join('|') + ')');
	}
}
