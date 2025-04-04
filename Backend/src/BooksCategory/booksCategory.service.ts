import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { BooksCategroy } from "./booksCategory.entity";
import { Books } from "src/Books/books.entity";

@Injectable()
export class BooksCategoryService {
  constructor(
    @InjectRepository(BooksCategroy)
    private booksCategoryRepository: Repository<BooksCategroy>,
    
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  // 根據輸入的關鍵字搜尋書名、作者或分類
  async getBooksByCategory(query: string): Promise<Books[]> {
    // 1. 搜尋符合分類關鍵字的分類
    const matchedCategories = await this.booksCategoryRepository.find({
      where: { category_name: Like(`%${query}%`) },
    });

    // 2. 抽出符合的分類 ID
    const categoryIds = matchedCategories.map((c) => c.categroy_id);

    // 3. 建立書籍查詢條件
    const queryBuilder = this.booksRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.category", "category")
      .leftJoinAndSelect("book.publisher", "publisher") 
      .where("book.book_title LIKE :title", { title: `%${query}%` })
      .orWhere("book.book_author LIKE :author", { author: `%${query}%` });

    // 4. 如果有符合的分類 ID，就加上分類條件
    if (categoryIds.length > 0) {
      queryBuilder.orWhere("category.categroy_id IN (:...categoryIds)", {
        categoryIds,
      });
    }

    // 5. 回傳查詢結果
    const books = await queryBuilder.getMany();
    return books;
  }
}
