import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { DatabaseService } from '@nnpp/database';
import { createSlug } from 'libs/helper/create.slug';
import { SingleArticleResponseWrapperDto } from './dto/article.respone.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createArticle(data: CreateArticleDto, userId: number) {
    const { title, description, body, tagList } = data;

    let slug = createSlug(title);

    const exitedSlug = this.databaseService.article.findUnique({
      where: { slug },
    });
    if (exitedSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    return this.databaseService.article.create({
      data: {
        title,
        description,
        body,
        slug,
        authorId: userId,
        ...(tagList &&
          tagList.length > 0 && {
            tagList: {
              connectOrCreate: tagList.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            },
          }),
      },
    });
  }

  // Get an article by slug
  async getBySlug(slug: string) {
    const article = this.databaseService.article.findUnique({
      where: { slug },
      include: {
        author: true,
        tagList: true,
        favoritedBy: true,
        _count: {
          select: { favoritedBy: true },
        },
      },
    });
    // check article có tồn tại hay không?
    if (!article) {
      // throw status code 404
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async updateArticle(
    slug: string,
    updateData: UpdateArticleDto,
    userId: number,
  ): Promise<any> {
    // Tìm bài viết theo slug
    const article = await this.getBySlug(slug);

    // Kiểm tra bài viết tồn tại
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Kiểm tra quyền - chỉ tác giả mới được phép cập nhật
    if (article.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this article',
      );
    }

    // Chuẩn bị dữ liệu cập nhật - chỉ lấy các trường được cung cấp
    const updateFields: any = {};

    if (updateData.title) updateFields.title = updateData.title;
    if (updateData.description)
      updateFields.description = updateData.description;
    if (updateData.body) updateFields.body = updateData.body;

    // Xử lý slug nếu title thay đổi
    if (updateData.title && updateData.title !== article.title) {
      updateFields.slug = createSlug(updateData.title);
    }

    // Cập nhật tagList nếu được cung cấp
    let tagOperation = {};
    if (updateData.tagList) {
      tagOperation = {
        tagList: {
          set: [], // Xóa tất cả tags hiện tại
          connectOrCreate: updateData.tagList.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      };
    }

    const updatedArticle = await this.databaseService.article.update({
      where: { id: article.id },
      data: {
        ...updateFields,
        ...tagOperation,
      },
      // Chỉ select các field cần thiết
      select: {
        title: true,
        description: true,
        body: true,
      },
    });

    return {
      article: {
        title: updatedArticle.title,
        description: updatedArticle.description,
        body: updatedArticle.body,
      },
    };
  }

  async deleteArticle(slug: string, userId: number): Promise<void> {
    // Tìm bài viết theo slug
    const article = await this.databaseService.article.findUnique({
      where: { slug },
      select: {
        id: true,
        authorId: true,
      },
    });

    // Check xem bài viết có tồn tại ko
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Kiểm tra quyền - chỉ tác giả mới được phép xóa
    if (article.authorId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this article',
      );
    }

    await this.databaseService.article.delete({
      where: { id: article.id },
    });
    return;
  }
}
