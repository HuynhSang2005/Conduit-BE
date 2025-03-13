import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class TagsResponseDto {
  @ApiProperty({
    description: 'List of all tags',
    type: [String],
    example: ['super', 'train', 'reactjs', 'nestjs'],
  })
  @IsArray()
  @IsNotEmpty()
  tags: string[];
}
