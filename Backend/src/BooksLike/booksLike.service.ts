import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BooksLikes } from "./booksLike.entity";
import { Books } from "src/Books/books.entity";
import { Members } from "src/Member/members.entity";

@Injectable()
export class BookLikeService {
  constructor(
    @InjectRepository(BooksLikes) private bookLikeRepository: Repository<BooksLikes>,
    @InjectRepository(Books) private booksRepository: Repository<Books>,
    @InjectRepository(Members) private membersRepository: Repository<Members>,
  ) {}

  // ✅ 使用者按下「喜歡」按鈕
  async likeBook(memberId: number, bookId: number): Promise<BooksLikes> {
    const book = await this.booksRepository.findOne({ where: { book_id: bookId } });
    const member = await this.membersRepository.findOne({ where: { member_id: memberId } });

    if (!book) throw new NotFoundException("書籍不存在");
    if (!member) throw new NotFoundException("會員不存在");

    const existingLike = await this.bookLikeRepository.findOne({
      where: { book, member },
    });

    if (existingLike) {
      throw new Error("你已經對這本書按過喜歡了");
    }

    const newLike = this.bookLikeRepository.create({
      book,
      member,
    });

    return await this.bookLikeRepository.save(newLike);
  }

  // ✅ 取得使用者喜歡的書籍列表
  async getUserLikedBooks(memberId: number): Promise<Books[]> {
    const likes = await this.bookLikeRepository.find({
      where: { member: { member_id: memberId } },
      relations: ["book"],
    });

    return likes.map(like => like.book);
  }

  // ✅ 取消喜歡
  async unlikeBook(memberId: number, bookId: number): Promise<string> {
    const book = await this.booksRepository.findOne({ where: { book_id: bookId } });
    const member = await this.membersRepository.findOne({ where: { member_id: memberId } });

    if (!book) throw new NotFoundException("書籍不存在");
    if (!member) throw new NotFoundException("會員不存在");

    const like = await this.bookLikeRepository.findOne({
      where: { book, member },
    });

    if (!like) {
      throw new Error("你尚未對這本書按喜歡");
    }

    await this.bookLikeRepository.remove(like);
    return "成功取消喜歡";
  }
}
