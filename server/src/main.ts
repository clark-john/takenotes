import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

(async () => {
	const port = 8000;
	const app = await NestFactory.create(AppModule);

	app.use(cookieParser());
	app.enableCors({ origin: 'http://localhost:5173', credentials: true });

	const isDev = process.env.NODE_ENV === 'development';

	await app.listen(port, () => {
		console.log('Server listening at port ' + port);
		if (isDev) {
			console.log('GraphQL Playground: http://localhost:' + port + '/graphql');
		}
	});
})();
