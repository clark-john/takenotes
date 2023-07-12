import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const CurrentUserId = createParamDecorator(
	(_data: any, ctx: ExecutionContext) => {
		const context = GqlExecutionContext.create(ctx);
		const req = context.getContext().req as Request;
		return req.user.sub;
	}
);
