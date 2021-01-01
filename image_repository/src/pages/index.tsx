import React from "react";
import Head from "next/head";
import Link from "next/link";

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
        <div>
          <h1 className="px-5 text-4xl font-bold leading-tight tracking-tight text-center sm:mt-4 sm:text-6xl">
            Image Repository
          </h1>
          <Link href="/login">
            <a href="#" className="text-blue-500">
              Login
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
