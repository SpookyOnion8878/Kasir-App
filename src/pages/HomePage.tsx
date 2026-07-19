import { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../api/pos';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import type { Product } from '../types';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('Makanan');
  const { addProduct } = useCart();

  const loadProducts = (category: string) => {
    getProductsByCategory(category)
      .then(setProducts)
      .catch((err) => console.error('Failed to load products', err));
  };

  useEffect(() => {
    loadProducts(activeCategory);
  }, [activeCategory]);

  const handleAdd = async (product: Product) => {
    await addProduct(product);
    Swal.fire({
      title: 'Added',
      text: `${product.name} added to cart.`,
      icon: 'success',
      timer: 900,
      showConfirmButton: false,
    });
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <CategoryList active={activeCategory} onSelect={setActiveCategory} />
        <Col>
          <h4>
            <strong>Products</strong>
          </h4>
          <hr />
          <Row>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAdd}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
