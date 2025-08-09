"use client";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { allPosts } from "contentlayer/generated";
import { BlogCard } from "../blog/components/blog-card";
import { useEffect } from "react";

export function LandingPageBlog() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });

    AOS.refresh();
  }, []);

  const threePost = [allPosts[0] , allPosts[1], allPosts[2]];

  return (
    <>
      <div>
        <h1 className="font-bold text-xl md:text-3xl">Bali Adventure Tours</h1>
        <h3 className="text-base md:text-lg text-muted-foreground font-medium pt-2">
          Experience the island's natural beauty with exciting tours like
          snorkeling and more!
        </h3>

        {/* Mobile View (vertical list) */}
        <div data-aos="fade-up-right" className="md:hidden space-y-4 pt-5">
          {threePost
            .map((item) => {
              return <BlogCard key={item.id} item={item} />;
            })}
        </div>

        {/* Tablet/Desktop View (carousel) */}
        <div data-aos="fade-up-right" className="hidden md:block">
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-full pt-5 lg:gap-8 hidden md:block"
          >
            <CarouselContent>
              {threePost
                .map((item) => {
                  return (
                    <CarouselItem
                      key={item.id}
                      className="basis-[45%] lg:basis-[33.33%]"
                    >
                      <BlogCard item={item} />
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
}
