import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const initialProducts = [
  // Men's Collection
  { id: "m1", name: "Modular Shell Jacket", category: "men", price: 450, image: "/images/hero-1.png", stock: 3, tag: "System 01" },
  { id: "m2", name: "Kinetic Cargo Pants", category: "men", price: 280, image: "/images/cat-kinetic.png", stock: 12 },
  { id: "m3", name: "Technical Mid-Layer", category: "men", price: 180, image: "/images/cat-modular.png", stock: 4, tag: "New Release" },
  { id: "m4", name: "Utility Vest v2", category: "men", price: 220, image: "/images/hero-2.png", stock: 15 },
  // Kids' Collection
  { id: "k1", name: "Junior Tech Parka", category: "kids", price: 180, image: "/images/kids-hero.png", stock: 10, tag: "New" },
  { id: "k2", name: "Mini Cargo Joggers", category: "kids", price: 95, image: "/images/hero-4.png", stock: 5 },
  { id: "k3", name: "Kids Active Tee", category: "kids", price: 45, image: "/images/hero-5.png", stock: 20 },
];

async function main() {
  console.log('Seeding initial products...');
  for (const product of initialProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        stock: product.stock,
        tag: product.tag,
        description: "Premium engineered fit with advanced materials for everyday performance."
      },
    });
  }
  console.log('Seeding done.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
