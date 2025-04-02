import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { BookLikeService } from "./booksLike.service";
import { BooksLikes } from "./booksLike.entity";
import { Books } from "src/Books/books.entity";

@Resolver(() => BooksLikes)
export class BookLikeResolver {
  constructor(private readonly bookLikeService: BookLikeService) {}

  // ✅ 按「喜歡」按鈕
  @Mutation(() => BooksLikes)
  async likeBook(
    @Args("memberId") memberId: number,
    @Args("bookId") bookId: number
  ): Promise<BooksLikes> {
    return this.bookLikeService.likeBook(memberId, bookId);
  }

  // ✅ 取得使用者喜歡的書籍
  @Query(() => [Books])
  async getUserLikedBooks(@Args("memberId") memberId: number): Promise<Books[]> {
    return this.bookLikeService.getUserLikedBooks(memberId);
  }

  // ✅ 取消「喜歡」
  @Mutation(() => String) // 這裡改為 `String` 以匹配 `unlikeBook` 回傳的 `string`
  async unlikeBook(
    @Args("memberId") memberId: number,
    @Args("bookId") bookId: number
  ): Promise<string> {
    return this.bookLikeService.unlikeBook(memberId, bookId);
  }
}
