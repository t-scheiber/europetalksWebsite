import HomeView from "@/components/home/HomeView";
import { getGalleryEvents } from "@/lib/gallery";

export default async function HomePage() {
  const gallery = await getGalleryEvents();
  return <HomeView gallery={gallery} />;
}
