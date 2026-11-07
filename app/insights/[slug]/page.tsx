import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  LinkedinIcon,
  TwitterXIcon,
} from "@/components/Icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    return {
      title: "Insight Not Found | Green Shoots Wealth",
    };
  }

  return {
    title: `${post.title} | Green Shoots Wealth Insights`,
    description:
      post.excerpt ||
      "Thoughtful perspectives on wealth architecture, disciplined investing, and financial independence.",
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  // Related posts
  const relatedPosts = await prisma.blogPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      category: post.category,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full bg-[#F5F1E8] min-h-screen">
      {/* 1. ARTICLE HERO */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#5d7064] font-sans mb-6">
          <Link href="/" className="hover:text-[#1F3A2C]">
            Home
          </Link>
          <span>/</span>
          <Link href="/insights" className="hover:text-[#1F3A2C]">
            Insights
          </Link>
          <span>/</span>
          <span className="text-[#1F3A2C] font-medium truncate max-w-xs sm:max-w-sm">
            {post.category}
          </span>
        </nav>

        {/* Category & Type Pills */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8fa868] bg-[#EEF0D9] px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-[11px] font-medium tracking-wide uppercase text-[#968254] bg-[#f2ecdc] px-2.5 py-1 rounded-full">
            {post.type}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] text-[#1F3A2C] font-normal leading-[1.18] tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt / Lead */}
        {post.excerpt && (
          <p className="text-base sm:text-lg text-[#526658] font-sans leading-relaxed mt-4 italic font-normal">
            {post.excerpt}
          </p>
        )}

        {/* Author & Publish Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 mt-6 border-y border-[#e2dcd0]">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#244534] border border-[#d6cfbf]">
              <Image
                src="/saloni_mehta.jpeg"
                alt={post.author}
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold text-[#1F3A2C]">
                {post.author}
              </div>
              <div className="text-[11px] text-[#718579] font-sans">
                {post.authorRole || "Founder & Wealth Architect"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#5d7064]">
            <span>
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Cover Image Banner */}
        {post.coverImage && (
          <div className="relative w-full h-72 sm:h-96 lg:h-[440px] rounded-3xl overflow-hidden my-8 shadow-sm border border-[#e2dcd0]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              unoptimized={Boolean(post.coverImage.startsWith("data:") || post.coverImage.startsWith("http"))}
              className="object-cover"
            />
          </div>
        )}

        {/* Main Notion-Rendered Content */}
        <div
          className="notion-rendered-content pt-2 pb-10"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Author Bio Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ded8cb] shadow-xs mt-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#244534] shrink-0 border border-[#c5a963]/40">
            <Image
              src="/saloni_mehta.jpeg"
              alt="Saloni Mehta"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-serif text-xl font-normal text-[#1F3A2C]">
                  Written by {post.author}
                </h4>
                <p className="text-xs text-[#8fa868] font-medium">
                  {post.authorRole || "Founder & Wealth Architect"} · Green Shoots Wealth
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/the-saloni-mehta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F3A2C] text-white text-xs font-semibold hover:bg-[#162a20] transition-colors self-center sm:self-auto"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>Connect</span>
              </a>
            </div>
            <p className="text-xs text-[#526658] leading-relaxed pt-1">
              Saloni founded Green Shoots Wealth to unite emotional awareness with disciplined financial architecture. She advises high-net-worth families, senior professionals, and independent women across domestic mutual funds, global portfolios, and GIFT City IFSC structures.
            </p>
          </div>
        </div>

        {/* CTA Banner: Discuss With Saloni */}
        <div className="bg-[#1F3A2C] text-white rounded-3xl p-8 sm:p-10 my-10 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c5a963]">
              TAKE THE NEXT STEP
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal leading-snug">
              Have questions about your portfolio strategy?
            </h3>
            <p className="text-xs sm:text-sm text-[#cfded5] leading-relaxed">
              Start with a structured, zero-pressure conversation with our senior advisory team.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-full bg-[#8fa868] hover:bg-[#7e9758] text-[#1F3A2C] text-xs font-semibold tracking-wide transition-all shrink-0 shadow-md flex items-center gap-2"
          >
            <span>Book a Consultation</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        {/* Related Insights Grid */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-[#ded8cb]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-[#1F3A2C] font-normal">
                Related Insights
              </h3>
              <Link
                href="/insights"
                className="text-xs font-semibold text-[#8fa868] hover:underline"
              >
                View All Insights →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/insights/${rel.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-[#ded8cb]/80 hover:shadow-lg transition-all group flex flex-col"
                >
                  <div className="relative h-44 w-full bg-neutral-100 overflow-hidden">
                    {rel.coverImage && (
                      <Image
                        src={rel.coverImage}
                        alt={rel.title}
                        fill
                        unoptimized={Boolean(rel.coverImage.startsWith("data:") || rel.coverImage.startsWith("http"))}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8fa868]">
                        {rel.category}
                      </span>
                      <h4 className="font-serif text-lg text-[#1F3A2C] leading-snug mt-1 group-hover:text-[#8fa868] transition-colors line-clamp-2">
                        {rel.title}
                      </h4>
                      {rel.excerpt && (
                        <p className="text-xs text-[#5f7366] line-clamp-2 mt-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="text-[11px] text-gray-400 font-sans pt-2 border-t border-gray-100 flex items-center justify-between">
                      <span>{rel.readTime}</span>
                      <span className="text-[#1F3A2C] font-semibold group-hover:translate-x-1 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

