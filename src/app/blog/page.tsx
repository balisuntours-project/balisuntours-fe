import { allPosts } from "contentlayer/generated";
import { BlogHero } from "./components/hero";
import { BlogCard } from "./components/blog-card";
import { LargeNavbar } from "../global-components/large.navbar";
import { LandingPageFooterSection } from "../global-components/landing-page.footer";

export default function BlogPage() {
  const randomIndex = Math.floor(Math.random() * allPosts.length);
  const post = allPosts[randomIndex];

  return (
    <>
      <LargeNavbar />
      <section className="py-32">
        <div className="container flex flex-col items-center gap-16 md:px-8">
          <div className="text-center">
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              Bali Adventure Tours
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              Bali offers thrilling adventures, from rafting through scenic
              rivers to ATV rides through lush landscapes. Experience the
              island’s natural beauty with exciting tours like snorkeling and
              more!
            </p>
          </div>

          <BlogHero post={post} />
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {allPosts.map((item, _) => {
              // remove the fisrt post
              if (item.id !== post.id) {
                return <BlogCard key={item.id} item={item} />;
              }
            })}
          </div>
        </div>
      </section>
      <hr />
      <div className="container flex flex-col gap-11 px-3 md:px-8  pt-11 pb-11">
        <LandingPageFooterSection />
      </div>
    </>
  );
}
