
import { User, Product, Category, Order } from '../types';

export const mockUsers: User[] = [
    { id: 'user-1', username: 'JaneDoe', email: 'jane.doe@example.com', createdAt: new Date('2023-01-15') },
    { id: 'user-2', username: 'JohnSmith', email: 'john.smith@example.com', createdAt: new Date('2023-02-20') }
];

export const mockProducts: Product[] = [
    {
        id: 'prod-1',
        title: 'Vintage Leather Armchair',
        description: 'A beautiful, well-loved leather armchair with a classic design. Perfect for a reading nook. Minor wear adds to its character.',
        category: Category.Furniture,
        price: 250,
        imageUrl: 'https://picsum.photos/seed/armchair/600/400',
        seller: mockUsers[1],
        createdAt: new Date('2024-05-10')
    },
    {
        id: 'prod-2',
        title: 'Sony WH-1000XM4 Headphones',
        description: 'Industry-leading noise canceling headphones. In excellent condition with original case and cables. Amazing sound quality.',
        category: Category.Electronics,
        price: 180,
        imageUrl: 'https://picsum.photos/seed/headphones/600/400',
        seller: mockUsers[0],
        createdAt: new Date('2024-05-12')
    },
    {
        id: 'prod-3',
        title: 'Classic Hardcover Novels (Set of 5)',
        description: 'A collection of five classic novels, including "Moby Dick" and "Pride and Prejudice". Great for any book lover.',
        category: Category.Books,
        price: 45,
        imageUrl: 'https://picsum.photos/seed/books/600/400',
        seller: mockUsers[1],
        createdAt: new Date('2024-05-15')
    },
    {
        id: 'prod-4',
        title: 'Men\'s Denim Jacket',
        description: 'A stylish and durable denim jacket, size Large. Lightly worn, no stains or tears. A timeless wardrobe staple.',
        category: Category.Clothing,
        price: 60,
        imageUrl: 'https://picsum.photos/seed/jacket/600/400',
        seller: mockUsers[0],
        createdAt: new Date('2024-05-18')
    },
    {
        id: 'prod-5',
        title: 'Antique Wooden Desk',
        description: 'Solid oak desk with intricate carvings. Provides a large workspace and includes three drawers. A statement piece for any home office.',
        category: Category.Furniture,
        price: 400,
        imageUrl: 'https://picsum.photos/seed/desk/600/400',
        seller: mockUsers[1],
        createdAt: new Date('2024-05-20')
    },
    {
        id: 'prod-6',
        title: 'Portable Bluetooth Speaker',
        description: 'Compact and powerful speaker with 12-hour battery life. Water-resistant and perfect for outdoor use. Great sound in a small package.',
        category: Category.Electronics,
        price: 50,
        imageUrl: 'https://picsum.photos/seed/speaker/600/400',
        seller: mockUsers[0],
        createdAt: new Date('2024-05-22')
    }
];

export const mockOrders: Order[] = [
    {
        id: 'order-1',
        buyer: mockUsers[0],
        products: [mockProducts[0], mockProducts[2]],
        totalAmount: 295,
        purchaseDate: new Date('2024-04-20')
    }
];
