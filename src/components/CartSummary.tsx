import { Badge, Col, ListGroup, Row } from 'react-bootstrap';
import { formatCurrency } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function CartSummary() {
  const { items } = useCart();

  return (
    <Col md={3} className="mt-2">
      <h4>
        <strong>Order Summary</strong>
      </h4>
      <hr />
      {items.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <ListGroup variant="flush">
          {items.map((item) => (
            <ListGroup.Item key={item.id}>
              <Row className="align-items-center">
                <Col xs={2}>
                  <Badge pill bg="success">
                    {item.quantity}
                  </Badge>
                </Col>
                <Col>
                  <div>{item.product.name}</div>
                  <small className="text-muted">
                    {formatCurrency(item.product.price)} each
                  </small>
                </Col>
                <Col className="text-end">
                  <strong>{formatCurrency(item.totalPrice)}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Col>
  );
}
