export default function NotFound() {
  return null;
}

export async function generateMetadata() {
  return {
    title: "404 Page you looking for not found",
  };
}

export async function generateStaticParams() {
  return [];
}
