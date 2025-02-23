import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UserProfileService } from '../services/user-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileService],
  exports: [UserProfileService],
})
export class UserProfileModule {}
