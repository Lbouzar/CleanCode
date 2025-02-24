import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserProfileService } from '../services/user-profile.service';
import { UserProfile } from '../entities/user-profile.entity';

@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  async create(@Body() userProfile: UserProfile): Promise<UserProfile> {
    return this.userProfileService.createUserProfile(userProfile);
  }

  @Get()
  async findAll(): Promise<UserProfile[]> {
    return this.userProfileService.getUserProfiles();
  }

  @Get(':username')
  async findOne(
    @Param('username') username: string,
  ): Promise<UserProfile | null> {
    return this.userProfileService.findOne(username);
  }
}
