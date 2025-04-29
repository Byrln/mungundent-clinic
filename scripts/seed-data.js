const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.post.deleteMany({});

  // Seed services
  console.log('Seeding services...');
  const services = [
    {
      title: "Шүдний үзлэг",
      description: "Шүдний эрүүл мэндийн байдлыг үнэлэх, асуудлыг эрт илрүүлэх иж бүрэн үзлэг.",
      price: 30000,
      imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Шүдний цэвэрлэгээ",
      description: "Шүдний чулуу, өнгө өөрчлөлтийг арилгах мэргэжлийн цэвэрлэгээ.",
      price: 50000,
      imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Фторт эмчилгээ",
      description: "Шүдний эмаль бэхжүүлэх, цооролтоос сэргийлэх фторт эмчилгээ.",
      price: 40000,
      imageUrl: null
    },
    {
      title: "Шүдний битүүлэгч",
      description: "Шүдний цооролтоос сэргийлэх, хүүхдийн араа шүдэнд зориулсан битүүлэгч.",
      price: 25000,
      imageUrl: null
    },
    {
      title: "Шүдний ломбо",
      description: "Шүдний цооролтыг засах, шүдний бүтцийг сэргээх ломбо.",
      price: 60000,
      imageUrl: "https://images.unsplash.com/photo-1606265752439-1f18756aa8ed?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Шүдний суурь",
      description: "Шүдний мэдрэлийг хамгаалах, ломбоны суурь болгох эмчилгээ.",
      price: 40000,
      imageUrl: null
    },
    {
      title: "Шүдний мэдрэл авах",
      description: "Шүдний мэдрэлийн үрэвсэл, өвдөлтийг эмчлэх мэдрэл авах эмчилгээ.",
      price: 150000,
      imageUrl: null
    },
    {
      title: "Шүдний бүрээс",
      description: "Эвдэрсэн шүдийг сэргээх, хамгаалах бүрээс.",
      price: 250000,
      imageUrl: null
    },
    {
      title: "Циркон бүрээс",
      description: "Өндөр чанартай, байгалийн шүдтэй адил харагдах циркон бүрээс.",
      price: 350000,
      imageUrl: "https://images.unsplash.com/photo-1581585099522-f6ac2efe9b7c?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Шүдний цайруулалт",
      description: "Шүдний өнгийг цайруулах, толбо арилгах эмчилгээ.",
      price: 200000,
      imageUrl: null
    },
    {
      title: "Шүдний винир",
      description: "Шүдний гадаргууг засах, өнгийг сайжруулах винир.",
      price: 300000,
      imageUrl: null
    },
    {
      title: "Шүдний гажиг засал",
      description: "Шүдний байрлалыг засах, зөв хэлбэрт оруулах эмчилгээ.",
      price: null,
      imageUrl: null
    },
    {
      title: "Хүүхдийн шүдний үзлэг",
      description: "Хүүхдийн шүдний эрүүл мэндийг үнэлэх, асуудлыг эрт илрүүлэх үзлэг.",
      price: 25000,
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Хүүхдийн шүдний цэвэрлэгээ",
      description: "Хүүхдийн шүдний эрүүл мэндийг хадгалах, цэвэрлэх эмчилгээ.",
      price: 40000,
      imageUrl: null
    },
    {
      title: "Хүүхдийн шүдний ломбо",
      description: "Хүүхдийн шүдний цооролтыг засах, шүдний бүтцийг сэргээх ломбо.",
      price: 50000,
      imageUrl: null
    },
    {
      title: "Хүүхдийн шүдний битүүлэгч",
      description: "Хүүхдийн араа шүдийг цооролтоос сэргийлэх битүүлэгч.",
      price: 25000,
      imageUrl: null
    }
  ];

  for (const service of services) {
    await prisma.service.create({
      data: service
    });
  }

  // Seed products
  console.log('Seeding products...');
  const products = [
    {
      name: "Японы шүдний оо - Apagard",
      description: "Нано-гидроксиапатит агуулсан өндөр чанартай шүдний оо. Шүдний эмаль сэргээх, цайруулах үйлчилгээтэй.",
      imageUrl: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?q=80&w=1974&auto=format&fit=crop",
      price: 35000,
      inStock: true
    },
    {
      name: "Японы шүдний сойз - GUM",
      description: "Зөөлөн хялгас бүхий шүдний сойз. Буйлыг гэмтээхгүйгээр шүдийг цэвэрлэнэ.",
      imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=1980&auto=format&fit=crop",
      price: 12000,
      inStock: true
    },
    {
      name: "Шүдний утас - Oral-B",
      description: "Шүдний завсрыг цэвэрлэх өндөр чанартай шүдний утас.",
      imageUrl: "https://images.unsplash.com/photo-1559304822-9eb2813c9844?q=80&w=2036&auto=format&fit=crop",
      price: 8000,
      inStock: true
    },
    {
      name: "Хүүхдийн шүдний оо - Kodomo",
      description: "Хүүхдэд зориулсан амттай, фтортой шүдний оо.",
      imageUrl: "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?q=80&w=2070&auto=format&fit=crop",
      price: 9500,
      inStock: true
    },
    {
      name: "Шүдний ариутгагч шингэн - Listerine",
      description: "Шүдний завсар, буйлыг цэвэрлэх, амны үнэр арилгах шингэн.",
      imageUrl: "https://images.unsplash.com/photo-1621951753015-740c699ab970?q=80&w=2080&auto=format&fit=crop",
      price: 18000,
      inStock: true
    },
    {
      name: "Шүдний цайруулагч - Crest",
      description: "Шүдийг цайруулах, толбо арилгах гель.",
      imageUrl: "https://images.unsplash.com/photo-1570612861542-284f4c12e75f?q=80&w=2070&auto=format&fit=crop",
      price: 45000,
      inStock: false
    },
    {
      name: "Хүүхдийн шүдний сойз - Jordan",
      description: "Хүүхдийн гарт тохирсон, зөөлөн хялгастай шүдний сойз.",
      imageUrl: "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=1974&auto=format&fit=crop",
      price: 7500,
      inStock: true
    },
    {
      name: "Шүдний эмийн хайрцаг",
      description: "Шүдний брекет, хиймэл шүд хадгалах жижиг хайрцаг.",
      imageUrl: "https://images.unsplash.com/photo-1586769852044-692d6e3703f2?q=80&w=1974&auto=format&fit=crop",
      price: 15000,
      inStock: true
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  // Seed posts (for blog/news)
  console.log('Seeding posts...');
  const posts = [
    {
      title: "Шүдний эрүүл мэндийг хэрхэн хадгалах вэ?",
      content: "Шүдний эрүүл мэндийг хадгалахын тулд өдөрт 2 удаа шүдээ сойзоор цэвэрлэх, шүдний утсаар шүдний завсрыг цэвэрлэх, чихэр болон хүчиллэг хүнс бага хэрэглэх, тогтмол шүдний эмчид үзүүлэх шаардлагатай. Эдгээр энгийн дадал нь шүдний өвчнөөс урьдчилан сэргийлэхэд тусална.",
      imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1974&auto=format&fit=crop"
    },
    {
      title: "Хүүхдийн шүдний эрүүл мэнд",
      content: "Хүүхдийн шүдний эрүүл мэндийг хадгалах нь насанд хүрсэн хойно нь эрүүл шүдтэй байх үндэс юм. Хүүхдийн шүдийг зөв арчлах, тогтмол шүдний эмчид үзүүлэх, зөв хооллолт нь хүүхдийн шүдний эрүүл мэндэд чухал нөлөөтэй.",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
    },
    {
      title: "Циркон бүрээсний давуу талууд",
      content: "Циркон бүрээс нь байгалийн шүдтэй адил харагдах, удаан эдэлгээтэй, хөнгөн, биед хоргүй зэрэг олон давуу талтай. Циркон бүрээс нь шүдний гоо сайхан, үйл ажиллагааг сэргээхэд тусална.",
      imageUrl: "https://images.unsplash.com/photo-1581585099522-f6ac2efe9b7c?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post
    });
  }

  // Seed sample bookings
  console.log('Seeding bookings...');
  const bookings = [
    {
      name: "Болд Баатар",
      phone: "99112233",
      serviceType: "Шүдний үзлэг",
      date: new Date("2024-05-15"),
      time: "10:00",
      message: "Шүдний өвдөлттэй байгаа."
    },
    {
      name: "Сараа Сүхбаатар",
      phone: "99445566",
      serviceType: "Шүдний цэвэрлэгээ",
      date: new Date("2024-05-16"),
      time: "14:00",
      message: ""
    }
  ];

  for (const booking of bookings) {
    await prisma.booking.create({
      data: booking
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });