// Script to create a test product
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Creating test product...');
  
  const prisma = new PrismaClient();
  
  try {
    // Create a test product
    const product = await prisma.product.create({
      data: {
        name: 'Японы шүдний оо - Apagard',
        description: 'Нано-гидроксиапатит агуулсан өндөр чанартай шүдний оо. Шүдний эмаль сэргээх, цайруулах үйлчилгээтэй.',
        imageUrl: 'https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=1974&auto=format&fit=crop',
        price: 35000,
        inStock: true,
      },
    });
    
    console.log('Test product created successfully:', product);
    
    // Create another test product
    const product2 = await prisma.product.create({
      data: {
        name: 'Японы шүдний сойз - GUM',
        description: 'Зөөлөн хялгас бүхий шүдний сойз. Буйлыг гэмтээхгүйгээр шүдийг цэвэрлэнэ.',
        imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=1980&auto=format&fit=crop',
        price: 12000,
        inStock: true,
      },
    });
    
    console.log('Second test product created successfully:', product2);
    
  } catch (error) {
    console.error('Error creating test product:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => console.log('Done'))
  .catch(e => console.error(e));