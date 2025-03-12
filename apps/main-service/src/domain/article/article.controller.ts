import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { RequestCreateArticleDto } from './dto/create-article.dto';
import {
  RequestUpdateArticleDto,
  UpdateArticleDto,
} from './dto/update-article.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiOperationDecorator, Public } from '@nnpp/decorators';
import { SingleArticleResponseWrapperDto } from './dto/article.respone.dto';
import { Article } from '@prisma/client';
import { Identity } from '@nnpp/decorators/identity.decorator';

@ApiBearerAuth()
@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(
    @Body() requestDto: RequestCreateArticleDto,
    @Identity('id') userId: number,
  ) {
    return this.articleService.createArticle(requestDto.article, userId);
  }

  // Get an article by slug
  @ApiOperationDecorator({
    operationId: 'getArticleBySlug',
    summary: 'Get article by slug',
    description: 'Get article by slug',
  })
  @ApiParam({ name: 'slug', description: 'Article slug' })
  @Public()
  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    // const article = this.articleService.getBySlug(slug);
    // return new SingleArticleResponseWrapperDto(article);
    return this.articleService.getBySlug(slug);
  }

  @ApiOperationDecorator({
    operationId: 'updateArticle',
    summary: 'Update article',
    description: 'Update article',
  })
  @ApiParam({ name: 'slug', description: 'Article slug' })
  @Put(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() requestUpdateDto: RequestUpdateArticleDto,
    @Identity('id') userId: number,
  ): Promise<SingleArticleResponseWrapperDto> {
    return this.articleService.updateArticle(
      slug,
      requestUpdateDto.article,
      userId,
    );
  }

  @ApiOperation({
    summary: 'Delete article',
    description: 'Delete an article. Auth required',
  })
  @ApiParam({ name: 'slug', description: 'Article slug' })
  @HttpCode(200)
  @Delete(':id')
  async deleteArticle(
    @Param('slug') slug: string,
    @Identity('id') userId: number,
  ) {
    return this.articleService.deleteArticle(slug, userId);
  }
}
