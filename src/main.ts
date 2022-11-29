import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Env } from './config/env';
import { TransformResponseInterceptor } from './core/interceptors';
import { setupSwagger } from './core/setup';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	setupSwagger(app);

	app.setGlobalPrefix('api', { exclude: ['docs'] });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.useGlobalInterceptors(new TransformResponseInterceptor());
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});

	const configService: ConfigService<Env> = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3000;

	await app.listen(port, () => {
		console.log(`SERVER LISTENING ON port ${port}`);
	});
}
bootstrap();
