import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { NotebookResolver, UserResolver, NoteResolver } from './resolvers';
import { AppController } from './app.controller';
import { IsAuthMiddleware } from './middleware/isauth.middleware';
import { NotebookService } from './services/notebook.service';

const services = [NotebookService]

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			playground: process.env.NODE_ENV === 'development'
		}),
		JwtModule.register({})
	],
	providers: [UserResolver, NotebookResolver, NoteResolver, ...services],
	controllers: [AppController]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthMiddleware).forRoutes('graphql');
	}
}
