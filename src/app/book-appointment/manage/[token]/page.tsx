// This is a server component
import BookingManager from './BookingManager';

export default function BookingPage({ params }: { params: { token: string } }) {
  return <BookingManager token={params.token} />;
}
