import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

// DTO cho request tạo comment
export class CreateCommentDto {
  @ApiProperty({
    description: 'Body of the comment',
    type: String,
    example: 'It takes a Jacobian',
  })
  @IsString()
  @IsNotEmpty()
  body: string;
}

// Wrapper DTO cho request tạo comment
export class RequestCreateCommentDto {
  @ApiProperty({
    description: 'Comment to be created',
    type: CreateCommentDto,
  })
  @IsNotEmpty()
  comment: CreateCommentDto;
}

// DTO cho author của comment
export class CommentAuthorDto {
  @ApiProperty({
    description: 'Username of the commenter',
    type: String,
    example: 'jake',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Bio of the commenter',
    type: String,
    nullable: true,
    example: 'I work at ...',
  })
  bio: string | null;

  @ApiProperty({
    description: 'Image URL of the commenter',
    type: String,
    nullable: true,
    example: 'test.png',
  })
  image: string | null;

  // @ApiProperty({
  //   description: 'Whether the current user follows this commenter',
  //   type: Boolean,
  //   example: false,
  // })
  // @IsNotEmpty()
  // @IsBoolean()
  // following: boolean;
}

// DTO cho response của comment
export class CommentResponseDto {
  @ApiProperty({
    description: 'ID of the comment',
    type: Number,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Created date of the comment',
    type: Date,
    example: '2025-02-18T03:22:56.637Z',
  })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date of the comment',
    type: Date,
    example: '2025-02-18T03:22:56.637Z',
  })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @ApiProperty({
    description: 'Body of the comment',
    type: String,
    example: 'It takes a Jacobian',
  })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({
    description: 'Author of the comment',
    type: CommentAuthorDto,
  })
  @IsNotEmpty()
  author: CommentAuthorDto;
}

// // Wrapper DTO cho response của một comment
// export class SingleCommentResponseDto {
//   @ApiProperty({
//     description: 'Comment response',
//     type: CommentResponseDto,
//   })
//   comment: CommentResponseDto;
// }

// // Wrapper DTO cho response của nhiều comment
// export class MultipleCommentsResponseDto {
//   @ApiProperty({
//     description: 'List of comments',
//     type: [CommentResponseDto],
//   })
//   comments: CommentResponseDto[];
// }
