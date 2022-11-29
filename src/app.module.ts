import { HealthCheckModule } from '@kiwi-lib/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './modules';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			cache: true,
		}),
		HealthCheckModule,
		ApiModule,
	],
})
export class AppModule {}
