import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from '@nnpp/database';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticleService } from './article.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly articleService: ArticleService,
  ) {}

  async createComment(data: CreateCommentDto, slug: string, userId: number) {
    const article = await this.articleService.getBySlug(slug);

    if (!article) {
      throw new NotFoundException(`article with slug "${slug}" not found`);
    }

    const comment = await this.databaseService.comment.create({
      data: {
        body: data.body,
        article: {
          connect: { id: article.id },
        },
        author: {
          connect: { id: userId },
        },
      },
      include: {
        author: true,
      },
    });

    return {
      comment: {
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: {
          username: comment.author.username,
          bio: comment.author.bio || null,
          image: comment.author.image || null,
        },
      },
    };
  }

  async findAllComments(slug: string): Promise<{ comments: any[] }> {
    // Tìm bài viết theo slug
    const article = await this.databaseService.article.findUnique({
      where: { slug },
    });

    if (!article) {
      throw new NotFoundException(`Article with slug "${slug}" not found`);
    }

    // Get all comment của article
    const comments = await this.databaseService.comment.findMany({
      where: {
        articleId: article.id,
      },
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      comments: comments.map((comment) => ({
        id: comment.id,
        body: comment.body,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        author: {
          username: comment.author.username,
          bio: comment.author.bio || null,
          image: comment.author.image || null,
        },
      })),
    };
  }

  async removeComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.databaseService.comment.findUnique({
      where: { id: commentId },
      include: { author: true },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found`);
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    await this.databaseService.comment.delete({
      where: { id: commentId },
    });
  }
}
