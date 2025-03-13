import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ApiOperationDecorator } from '@nnpp/decorators';
import { TagsResponseDto } from './dto/tag.response.dto';

@ApiTags('Tags')
@Controller('tags')
export class TagController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperationDecorator({
    operationId: 'getAllTags',
    summary: 'Get all tags',
    description: 'Get all tags that have been used in articles',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all tags',
  })
  @Get()
  async getAllTags(): Promise<TagsResponseDto> {
    return this.articleService.getAllTags();
  }
}
