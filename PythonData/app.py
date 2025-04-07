import requests
import pymysql
from datetime import datetime


db_config = {
    "host": "localhost",
    "user": "root",
    "password": "wang8119",
    "database": "library",
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}

def scrape_books_info():
    url = "https://athena.eslite.com/api/v2/search"
    params = {
        "final_price": "0,",
        "sort": "manufacturer_date desc",
        "size": "40",
        "start": "0",
        "status": "add_to_shopping_cart",
        "categories": '["85"]'
    }
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "application/json",
        "Referer": "https://www.eslite.com/",
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        data = response.json()
        hits = data.get("hits", {})
        return hits.get('hit', [])  
    except requests.exceptions.RequestException as e:
        print(f"請求失敗: {e}")
        return []


def get_or_create_publisher(connection, publisher_name):
    with connection.cursor() as cursor:
        sql = 'SELECT pub_id FROM publisher WHERE pub_name = %s'
        cursor.execute(sql, (publisher_name,)) 
        result = cursor.fetchone()
        if result:
            return result['pub_id'] 
        else:
            insert_sql = """
                INSERT INTO publisher (pub_name, pub_address) 
                VALUES (%s, %s)
            """
            cursor.execute(insert_sql, (publisher_name, ''))
            connection.commit()
            return cursor.lastrowid

def main():
    books_data = scrape_books_info()
    if not books_data:
        print('沒有爬取到書籍資料')
        return

    try:
        connection = pymysql.connect(**db_config)
        for item in books_data:
            fields = item.get('fields', {})
            book_title = fields.get('name')
            book_dec = fields.get('description', '')
            book_author = fields.get('author')
            book_pub_date = fields.get('manufacturer_date')
            
            # 處理發行日期
            if book_pub_date is None:
                print(f"⚠️ 書籍 {book_title} 缺少發行日期，使用當前時間")
                book_pub_date = datetime.now().strftime('%Y-%m-%d')
                print(f"目前使用的日期是：{book_pub_date}")
            else:
                try:
                    book_pub_date = datetime.strptime(book_pub_date, '%m/%d/%Y %H:%M:%S').strftime('%Y-%m-%d')
                    print(f"正確的日期是：{book_pub_date}")
                except ValueError:
                    print(f"日期格式錯誤，無法解析: {book_pub_date}")
                    book_pub_date = datetime.now().strftime('%Y-%m-%d')  # 預設為當前日期

            book_publisher = fields.get('manufacturer')
            print('出版社名稱是：', book_publisher)
            print('----------------------')

            if book_publisher:
                pub_id = get_or_create_publisher(connection, book_publisher)
            if pub_id is None:
                pub_id = 0  
            with connection.cursor() as cursor:
                sql = """
                    INSERT INTO books 
                    (book_title, book_author, pub_date, `explain`, pub_id, categroy_id, human_like) 
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    book_title,
                    book_author,
                    book_pub_date,
                    book_dec,
                    pub_id,
                    11,
                    0
                ))
        connection.commit()
        print(f"✅ 成功插入 {len(books_data)} 筆書籍資料!")

    except Exception as e:
        print(f"❌ 錯誤發生: {e}")
    finally:
        connection.close()

if __name__ == '__main__':
    main()
