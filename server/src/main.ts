import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

(async () => {
	const port = 8080;
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	
	app.enableCors({ 
		origin: process.env.CLIENT_URL, 
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS']
	});

	const isDev = process.env.NODE_ENV === 'development';

	await app.listen(port, () => {
		console.log('Server listening at port ' + port);
		if (isDev) {
			console.log('GraphQL Playground: http://localhost:' + port + '/graphql');
		}
	});
})();
