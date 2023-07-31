import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApolloDriverConfig, ApolloDriver, } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import {
	NotebookResolver,
	UserResolver,
	NoteResolver,
	SavedResolver
} from './resolvers';
import { NoteService, NotebookService, SavedService, DetanticService } from './services';
import { AppController } from './app.controller';
import { IsAuthMiddleware } from './middleware/isauth.middleware';

const services = [
	NotebookService, 
	NoteService, 
	SavedService,
	DetanticService
];

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: process.env.NODE_ENV === 'development' ? join(process.cwd(), 'src/schema.gql') : true,
			playground: process.env.NODE_ENV === 'development',
			context: ({ req, res }: any) => ({ req, res }),
		}),
		JwtModule.register({})
	],
	providers: [
		SavedResolver,
		UserResolver,
		NotebookResolver,
		NoteResolver,
		...services
	],
	controllers: [AppController]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthMiddleware).forRoutes('graphql');
	}
}
