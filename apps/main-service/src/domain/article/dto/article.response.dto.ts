import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class AuthorResponseDto {
  @ApiProperty({
    description: 'Username of the author',
    type: String,
    example: 'jake',
  })
  username: string;

  @ApiProperty({
    description: 'Bio of the author',
    type: String,
    nullable: true,
    example: 'I work at ...',
  })
  bio: string | null;

  @ApiProperty({
    description: 'Image of the author',
    type: String,
    nullable: true,
    example: 'test.img',
  })
  image: string | null;

  @ApiProperty({
    description: 'Whether the current user follows this author',
    type: Boolean,
    example: false,
  })
  following: boolean;
}

export class ArticleResponseDto {
  @ApiProperty({
    description: 'Slug of article',
    type: String,
    example: 'how-to-train-your-dragon',
  })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({
    description: 'Title of article',
    type: String,
    example: 'How to train your dragon',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of article',
    type: String,
    example: 'Ever wonder how?',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Body of article',
    type: String,
    example: 'It takes a Jacobian',
  })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Tag list of article',
    type: [String],
    example: ['dragons', 'training'],
  })
  @IsNotEmpty()
  @IsArray()
  tagList: string[];

  @ApiProperty({
    description: 'Created at date of article',
    type: Date,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated at date of article',
    type: Date,
    example: new Date(),
  })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: 'Whether the article is favorited by current user',
    type: Boolean,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  favorited: boolean;

  // @ApiProperty({
  //   description: 'Favorites count of article',
  //   type: Number,
  //   example: 0,
  // })
  // @IsNotEmpty()
  // @IsNumber()
  // favoritesCount: number;

  @ApiProperty({ type: AuthorResponseDto })
  @IsNotEmpty()
  author: AuthorResponseDto;
}

// Wrapper DTO cho response một article
export class SingleArticleResponseWrapperDto {
  @ApiProperty({
    description: 'Article response',
    type: ArticleResponseDto,
  })
  article: ArticleResponseDto;
}

// Wrapper DTO cho response nhiều article
// export class MultipleArticlesResponseWrapperDto {
//   @ApiProperty({
//     description: 'List of articles',
//     type: [ArticleResponseDto],
//   })
//   articles: ArticleResponseDto[];

//   @ApiProperty({
//     description: 'Articles count',
//     type: Number,
//     example: 10,
//   })
//   articlesCount: number;
// }
