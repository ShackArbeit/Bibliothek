'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import ThemeToggle from "@/Theme/ThemeSwitcher"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="
      fixed top-0 left-0 w-full
      flex items-center justify-between
      bg-white dark:bg-black drop-shadow-2xl z-50 px-4 py-2">    
      {/* 左側 Logo */}
      <div className="flex items-center ">
        <Image src='/logo.jpg' width={120} height={20} alt="Logo" />
      </div>
      {/* 右側漢堡按鈕（小螢幕時顯示） */}
      <div className="block md:hidden ml-auto">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-3 py-2 text-black">
          {/* 漢堡選單 Icon */}
          <svg className="h-10 w-10" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* 🔥 選單內容（小螢幕時全螢幕展開） */}
      {isOpen && (
        <div className="
        fixed top-0 
        dark:bg-black
        left-0 w-full h-screen 
        bg-white z-50 flex flex-col items-center justify-center">
          {/* ❌ 關閉按鈕 */}
          <button 
            onClick={() => setIsOpen(false)} 
            className="absolute top-4 right-4 text-4xl text-black"
          >
            ✖
          </button>
          {/* 選單連結 */}
          <div className="flex flex-col items-center space-y-6 text-2xl">
            <Link href="#" className="dark:text-white text-black " onClick={() => setIsOpen(false)}>註冊/登入</Link>
            <Link href="#" className="dark:text-white text-black" onClick={() => setIsOpen(false)}>讀者查詢服務</Link>
            <Link href="#" className="dark:text-white text-black" onClick={() => setIsOpen(false)}>書籍預約</Link>
            <Link href="#" className="dark:text-white text-black" onClick={() => setIsOpen(false)}>最新通知</Link>
          </div>
          {/* 按鈕區域 */}
          <div className="mt-6">
            <button className="bg-amber-500 text-white px-6 py-3 rounded">
              Click Me
            </button>
          </div>
        </div>
      )}
      {/* 桌面版選單（大螢幕時顯示） */}
      <div className="hidden md:flex space-x-6 
      md:grow-3
      pt-10
      flex items-center justify-center">
        <Link href="#" className="dark:text-white text-black text-2xl  font-bold">註冊/登入</Link>
        <div className="relative group">
              <Link href="#" className="dark:text-white text-black text-2xl  font-bold">讀者查詢服務</Link>
              {/* 🔽 下拉選單 */}
              <div className="
                absolute left-0 w-48 bg-white shadow-2xl rounded-md hidden
                group-hover:block">
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">查詢館藏</Link>
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">查詢借閱紀錄</Link>
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">查詢其他場館</Link>
              </div>
        </div>
        <div className="relative group">
              <Link href="#" className="dark:text-white text-black text-2xl  font-bold">預約服務</Link>
              {/* 🔽 下拉選單 */}
              <div className="
                absolute left-0 w-48 bg-white shadow-2xl rounded-md hidden
                group-hover:block">
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">圖書預約</Link>
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">講座報名</Link>
                <Link href="#" className="dark:text-white block px-4 py-2 hover:bg-gray-100 font-medium">其他預約</Link>
              </div>
        </div>
        <Link href="#" className="dark:text-white text-black text-2xl  font-bold">最新通知</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
