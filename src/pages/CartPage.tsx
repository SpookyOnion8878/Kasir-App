import { Col, Row, Container, ListGroup, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faBroom } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency } from '../utils/format';
import { useCart } from '../context/CartContext';
import CartSummary from '../components/CartSummary';
import CheckoutBar from '../components/CheckoutBar';

export default function CartPage() {
  const { items, incrementItem, decrementItem, removeItem, clearCart, loading, error } =
    useCart();

  return (
    <Container fluid className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-0">
          <strong>Your Cart</strong>
        </h3>
        {items.length > 0 && (
          <Button variant="outline-danger" size="sm" onClick={() => clearCart()}>
            <FontAwesomeIcon icon={faBroom} className="me-2" />
            Clear cart
          </Button>
        )}
      </div>
      <hr />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <p>Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted">Your cart is empty. Add some products!</p>
      ) : (
        <Row>
          <Col md={9}>
            <ListGroup>
              {items.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={5}>{item.product.name}</Col>
                    <Col md={2} className="text-muted">
                      {formatCurrency(item.product.price)}
                    </Col>
                    <Col md={3}>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => decrementItem(item.id)}
                        aria-label={`Decrease ${item.product.name}`}
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>{' '}
                      <span className="mx-2 fw-bold">{item.quantity}</span>{' '}
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => incrementItem(item.id)}
                        aria-label={`Increase ${item.product.name}`}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    </Col>
                    <Col md={1} className="text-end">
                      {formatCurrency(item.totalPrice)}
                    </Col>
                    <Col md={1} className="text-end">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <CartSummary />
        </Row>
      )}
      <CheckoutBar />
    </Container>
  );
}
