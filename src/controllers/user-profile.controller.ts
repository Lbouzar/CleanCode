import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userProfile: Partial<UserProfile>,
  ): Promise<UserProfile> {
    return this.userProfileService.updateUserProfile(id, userProfile);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userProfileService.deleteUserProfile(id);
  }

  @Post(':id/roles')
  async assignRoles(
    @Param('id') id: number,
    @Body('roles') roles: string[],
  ): Promise<UserProfile> {
    return this.userProfileService.assignRoles(id, roles);
  }
}
