import React from "react";
import Head from "next/head";
import Link from "next/link";
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Image Repository</title>
        <meta
          name="description"
          content="Image Repository you can make account and post your favorite images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex justify-center min-h-screen py-20 bg-gradient-to-b from-geist-50 via-geist-50 to-geist-100">
        <div className='my-auto text-center'>
          <h1 className="px-5 font-bold leading-tight tracking-tight sm:mt-4 sm:text-5xl">
            Your Ultimate Image Repository
          </h1>
          <span className='block my-5 text-2xl italic text-green-800'>Created By: Steven -</span>
          <div className='px-5 py-20'>
            <BiRightArrow className='inline mr-5' />
            <Link href="/login">
              <a href="#" className="px-10 py-5 text-2xl font-bold text-blue-600 bg-green-100 border border-black rounded-lg hover:bg-green-500 hover:text-white">
                Login
              </a>
            </Link>
            <BiLeftArrow className='inline ml-5' />
          </div>
        </div>
      </main>
    </div>
  );
}
