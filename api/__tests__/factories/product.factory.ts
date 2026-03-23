import { Product } from '@/entities/product.entity'

export function makeProduct(
  overrides?: Partial<
    Omit<
      ReturnType<typeof Product.create>['toJSON'],
      'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >
  >,
) {
  const defaultProps = {
    userId: 'user-123',
    title: 'Gaming Laptop',
    description: 'High-end gaming laptop with RTX 4070',
    hardwareSpec: 'CPU i7, 32GB RAM, RTX 4070',
    unitPriceBtc: 0.003,
    unitPriceFiat: 1500,
    stock: 10,
  }

  return Product.create({ ...defaultProps, ...overrides })
}
