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
}
