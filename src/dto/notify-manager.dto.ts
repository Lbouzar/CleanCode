import { ApiProperty } from '@nestjs/swagger';

export class NotifyManagerDto {
  @ApiProperty({
    example: 'manager@example.com',
    description: 'The email address of the manager',
  })
  email: string;

  @ApiProperty({
    example: 'Maintenance Alert',
    description: 'The subject of the email',
  })
  subject: string;

  @ApiProperty({
    example: 'There is a new maintenance alert.',
    description: 'The message body of the email',
  })
  message: string;
}
