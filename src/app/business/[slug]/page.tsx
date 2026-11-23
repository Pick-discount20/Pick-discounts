import { DEMO_BUSINESSES } from '@/data/mockData';
import { BusinessProfileView } from '@/components/business/BusinessProfileView';

// Generate static params for all illustrative business records for GitHub Pages static export
export function generateStaticParams() {
  return DEMO_BUSINESSES.map((business) => ({
    slug: business.slug,
  }));
}

export const dynamicParams = false;

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BusinessProfileView slug={slug} />;
}
