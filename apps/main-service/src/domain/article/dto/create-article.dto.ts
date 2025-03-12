import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Title of the article',
    example: 'How to train your dragon',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the article',
    example: 'Ever wonder how?',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Body of the article',
    example: 'You have to believe',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'List of tags for the article',
    example: ['dragons', 'training'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagList?: string[] = [];
}

export class RequestCreateArticleDto {
  @ApiProperty({
    description: 'Article to be created',
    type: CreateArticleDto,
  })
  @IsNotEmpty()
  article: CreateArticleDto;
}
