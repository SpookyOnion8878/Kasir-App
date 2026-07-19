import { Button, Col, Row, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../utils/format';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function CheckoutBar() {
  const { total, items, checkout } = useCart();
  const navigate = useNavigate();
  const isEmpty = items.length === 0;

  const handleCheckout = async () => {
    try {
      await checkout();
      await Swal.fire({
        title: 'Success',
        text: 'Your order has been placed.',
        icon: 'success',
        timer: 1200,
        showConfirmButton: false,
      });
      navigate('/success');
    } catch {
      // checkout() already restored the cart and set an error message.
      Swal.fire({
        title: 'Error',
        text: 'Checkout failed. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="fixed-bottom bg-white border-top shadow">
      <Container className="py-2">
        <Row className="align-items-center">
          <Col md={{ span: 4, offset: 8 }} className="px-2">
            <h5 className="mb-2">
              Total:{' '}
              <strong className="float-end">{formatCurrency(total)}</strong>
            </h5>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleCheckout}
              disabled={isEmpty}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              <strong>PAY</strong>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
