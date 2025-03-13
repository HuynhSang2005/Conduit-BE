import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Identity } from '@nnpp/decorators/identity.decorator';
import { CommentService } from './comment.service';
import { RequestCreateCommentDto } from './dto/create-comment.dto';
import { ApiOperationDecorator } from '@nnpp/decorators';

@ApiTags('Comments')
@Controller('articles/:slug/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperationDecorator({
    operationId: 'createComment',
    summary: 'Create comment',
    description: 'Create a comment for an article',
  })
  @ApiParam({ name: 'slug', description: 'Article slug' })
  @ApiResponse({
    status: 201,
    description: 'Comment created successfully',
  })
  @Post()
  async create(
    @Param('slug') slug: string,
    @Body() requestDto: RequestCreateCommentDto,
    @Identity('id') userId: number,
  ) {
    return this.commentService.createComment(requestDto.comment, slug, userId);
  }

  @ApiOperationDecorator({
    operationId: 'getCommentsBySlug',
    summary: 'Get comments',
    description: 'Get all comments for an article',
  })
  @ApiParam({ name: 'slug', description: 'Article slug' })
  @ApiResponse({
    status: 200,
    description: 'Comments retrieved successfully',
  })
  @Get()
  async findAll(@Param('slug') slug: string) {
    return this.commentService.findAllComments(slug);
  }

  @ApiOperationDecorator({
    operationId: 'deleteComment',
    summary: 'Delete comment',
    description: 'Delete a comment from an article',
  })
  @ApiParam({ name: 'id', description: 'Comment ID' })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted successfully',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @Identity('id') userId: number) {
    return this.commentService.removeComment(+id, userId);
  }
}
