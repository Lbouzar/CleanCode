import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';


// PostgreSQL Entities
import { Reservation } from './entities/reservation.entity';
import { Stock } from './entities/stock.entity';
import { User } from './entities/user.entity';


// MongoDB Schemas
import { Incident, IncidentSchema } from './schemas/incident.schema';
import { Maintenance, MaintenanceSchema } from './schemas/maintenance.schema';
import { Scooter, ScooterSchema } from './schemas/scooter.schema';


@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env file
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL_MONGO', 'mongodb://localhost:27017/mydatabase'),
      }),
    }),
    MongooseModule.forFeature([
      { name: Scooter.name, schema: ScooterSchema },
      { name: Maintenance.name, schema: MaintenanceSchema },
      { name: Incident.name, schema: IncidentSchema },
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL_POSTGRES', 'postgres://postgres:password@localhost:5432/mydatabase'),
        entities: [User, Stock, Reservation],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
