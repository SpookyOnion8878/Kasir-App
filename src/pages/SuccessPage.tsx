import { Button, Image, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function SuccessPage() {
  return (
    <Container className="mt-4 text-center">
      <Image src="/assets/images/sukses.png" width={500} fluid />
      <h2>Order Placed</h2>
      <p className="text-muted">Thank you for your purchase!</p>
      <Link to="/">
        <Button variant="primary">Back to menu</Button>
      </Link>
    </Container>
  );
}
