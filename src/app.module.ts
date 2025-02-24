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
import { UserProfile } from './entities/user-profile.entity';
import { Scooter as ScooterEntity } from './entities/scooter.entity';

// MongoDB Schemas
import { Incident, IncidentSchema } from './schemas/incident.schema';
import { Maintenance, MaintenanceSchema } from './schemas/maintenance.schema';
import { Scooter, ScooterSchema } from './schemas/scooter.schema';

// Importing all modules
import { MaintenanceModule } from './modules/maintenance.module';
import { ReservationModule } from './modules/reservation.module';
import { ScooterModule } from './modules/scooter.module';
import { StockModule } from './modules/stock.module';

// Importing services
import { UserProfileService } from './services/user-profile.service';
import { ScooterReservationService } from './services/scooter-reservation.service';

// Importing controllers
import { AuthController } from './controllers/auth.controller';
import { UserProfileController } from './controllers/user-profile.controller';
import { ScooterController } from './controllers/scooter.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env file
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(
          'DATABASE_URL_MONGO',
          'mongodb://localhost:27017/mydatabase',
        ),
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
        url: configService.get<string>(
          'DATABASE_URL_POSTGRES',
          'postgres://postgres:password@localhost:5432/mydatabase',
        ),
        entities: [User, Stock, Reservation, UserProfile, ScooterEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([UserProfile, ScooterEntity]),

    // Feature Modules
    StockModule,
    ReservationModule,
    ScooterModule,
    MaintenanceModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UserProfileController,
    ScooterController,
  ],
  providers: [AppService, UserProfileService, ScooterReservationService],
})
export class AppModule {}
