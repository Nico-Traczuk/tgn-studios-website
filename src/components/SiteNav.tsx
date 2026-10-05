import Nav from './Nav';
import { getWriterSession } from '@/lib/writers';

export default async function SiteNav() {
  const writer = await getWriterSession();
  return <Nav canWrite={Boolean(writer)} />;
}
