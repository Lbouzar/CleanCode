import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';

/**
 * Service to manage user profiles.
 * Provides methods to create and retrieve user profiles.
 */
@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  /**
   * Creates a new user profile.
   * @param userProfile - The user profile data to create.
   * @returns The created user profile.
   */
  async createUserProfile(userProfile: UserProfile): Promise<UserProfile> {
    return this.userProfileRepository.save(userProfile);
  }

  /**
   * Retrieves all user profiles.
   * @returns An array of user profiles.
   */
  async getUserProfiles(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  /**
   * Retrieves a user profile by username.
   * @param username - The username of the user profile to retrieve.
   * @returns The user profile if found, otherwise null.
   */
  async findOne(username: string): Promise<UserProfile | null> {
    return this.userProfileRepository.findOne({ where: { name: username } });
  }

  /**
   * Updates a user profile by ID.
   * @param id - The ID of the user profile to update.
   * @param userProfile - The new user profile data.
   * @returns The updated user profile.
   */
  async updateUserProfile(
    id: number,
    userProfile: Partial<UserProfile>,
  ): Promise<UserProfile> {
    await this.userProfileRepository.update(id, userProfile);
    const updatedUserProfile = await this.userProfileRepository.findOne({
      where: { id },
    });
    if (!updatedUserProfile) {
      throw new Error('UserProfile not found');
    }
    return updatedUserProfile;
  }

  /**
   * Deletes a user profile by ID.
   * @param id - The ID of the user profile to delete.
   */
  async deleteUserProfile(id: number): Promise<void> {
    await this.userProfileRepository.delete(id);
  }

  /**
   * Assigns roles to a user profile.
   * @param id - The ID of the user profile.
   * @param roles - The roles to assign.
   * @returns The updated user profile.
   */
  async assignRoles(id: number, roles: string[]): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { id },
    });
    if (!userProfile) throw new Error('User profile not found');
    userProfile.roles = roles;
    return this.userProfileRepository.save(userProfile);
  }
}
