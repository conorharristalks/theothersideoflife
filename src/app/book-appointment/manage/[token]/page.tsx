// This is a server component
import BookingManager from './BookingManager';

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function BookingPage({ params }: PageProps) {
  const { token } = await params;
  return <BookingManager token={token} />;
}
