import {
  faCheese,
  faCoffee,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const categoryIcon = (name: string): IconDefinition => {
  switch (name) {
    case 'Makanan':
      return faUtensils;
    case 'Minuman':
      return faCoffee;
    case 'Cemilan':
      return faCheese;
    default:
      return faUtensils;
  }
};
