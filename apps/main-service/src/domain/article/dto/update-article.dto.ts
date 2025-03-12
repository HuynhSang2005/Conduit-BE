import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateArticleDto {
  @ApiPropertyOptional({
    description: 'Title of the article',
    type: String,
    example: 'How to train your dragon',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the article',
    type: String,
    example: 'Ever wonder how?',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiPropertyOptional({
    description: 'Body of the article',
    type: String,
    example: 'You have to believe',
  })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  body?: string;

  @ApiPropertyOptional({
    description: 'List of tags for the article',
    example: ['dragons', 'training'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagList?: string[];
}

export class RequestUpdateArticleDto {
  @ApiProperty({
    description: 'Article to be updated',
    type: UpdateArticleDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateArticleDto)
  article: UpdateArticleDto;
}
