import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from '../entities/user-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userProfileService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      return result;
    }
    return null;
  }

  login(user: { username: string; userId: number }) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: {
    username: string;
    password: string;
  }): Promise<any> {
    // Validate user data (e.g., check if username already exists)
    const existingUser = await this.userProfileService.findOne(
      createUserDto.username,
    );
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving (assuming a hashPassword function exists)
    const hashedPassword = this.hashPassword(createUserDto.password);

    // Create a new user profile
    const newUser: UserProfile = {
      name: createUserDto.username, // Assign a name
      license: '', // Assign a license
      preferredModel: '', // Assign a preferred model
      roles: [], // Assign roles
      ...createUserDto,
      password: hashedPassword,
    };
    return this.userProfileService.createUserProfile(newUser);
  }

  private hashPassword(password: string): string {
    // Implement password hashing logic here
    return password; // Placeholder, replace with actual hashing logic
  }
}
