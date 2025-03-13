import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TagController } from './tag.controller';

@Module({
  controllers: [ArticleController, CommentController, TagController],
  providers: [ArticleService, CommentService],
})
export class ArticleModule {}
