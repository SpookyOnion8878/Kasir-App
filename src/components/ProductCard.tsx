import { Card, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { formatCurrency, productImageUrl } from '../utils/format';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <Col md={4} xs={6} className="mb-3">
      <Card className="shadow-sm h-100">
        <Card.Img
          variant="top"
          src={productImageUrl(product.category.name, product.image)}
          alt={product.name}
          style={{ height: 160, objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="d-flex justify-content-between">
            <span>{product.name}</span>
            <small className="text-muted">{product.code}</small>
          </Card.Title>
          <Card.Text className="fw-bold">
            {formatCurrency(product.price)}
          </Card.Text>
          <Button
            variant="primary"
            className="mt-auto"
            onClick={() => onAdd(product)}
            disabled={!product.isReady}
          >
            <FontAwesomeIcon icon={faCartPlus} className="me-2" />
            {product.isReady ? 'Add to cart' : 'Unavailable'}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
