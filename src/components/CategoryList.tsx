import { useEffect, useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCategories } from '../api/pos';
import { categoryIcon } from '../utils/categoryIcon';
import type { Category } from '../types';

interface CategoryListProps {
  active: string;
  onSelect: (name: string) => void;
}

export default function CategoryList({ active, onSelect }: CategoryListProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  return (
    <Col md={2} className="mt-2">
      <h4>
        <strong>Categories</strong>
      </h4>
      <hr />
      <ListGroup>
        {categories.map((category) => (
          <ListGroup.Item
            key={category.id}
            onClick={() => onSelect(category.name)}
            className={active === category.name ? 'category-active' : ''}
            style={{ cursor: 'pointer' }}
          >
            <h5 className="mb-0">
              <FontAwesomeIcon icon={categoryIcon(category.name)} className="me-2" />
              {category.name}
            </h5>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  );
}
