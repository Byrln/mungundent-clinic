# Мөнгөндент - Шүдний эмнэлгийн вэбсайт

Мөнгөндент шүдний эмнэлгийн танилцуулга вэбсайт. Next.js 15.3.1, TypeScript, TailwindCSS, Shadcn UI, Framer Motion, Prisma ORM ашиглан хийгдсэн.

## Технологиуд

- Next.js 15.3.1 (App Router, TypeScript)
- TailwindCSS
- Shadcn UI
- Framer Motion
- Lodash
- Prisma ORM + PostgreSQL (Neon)

## Суулгах заавар

1. Прожектийг клон хийх:

```bash
git clone <repository-url>
cd dental-clinic
```

2. Хамаарлуудыг суулгах:

```bash
npm install
```

3. Тохиргооны файл үүсгэх:

`.env` файл үүсгэж дараах мэдээллийг оруулна:

```
# Database connection string
# Using Neon PostgreSQL (cloud service) with direct connection
DATABASE_URL="postgresql://neondb_owner:npg_fRVQr6eIDb7N@ep-falling-cell-a1i5ipmu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
# Admin API key for protected routes
ADMIN_API_KEY="mongondent-secure-api-key-2024"

# Next.js environment
NODE_ENV="development"

# NextAuth.js configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="this-is-a-secret-value-for-dental-clinic-app"
```

**Neon PostgreSQL ашиглах (зөвлөмж):**

1. [Neon](https://neon.tech) дээр бүртгүүлж, шинэ төсөл үүсгэнэ
2. Холболтын мэдээллийг авч `.env` файлд оруулна
3. Холболтын мэдээлэл нь ийм хэлбэртэй байна: `postgresql://username:password@endpoint/dbname?sslmode=require`

4. Өгөгдлийн сан үүсгэх ба өгөгдөл оруулах:

```bash
# Өгөгдлийн сан үүсгэх, миграци ажиллуулах
npm run setup-db

# Жишээ өгөгдөл оруулах
npm run seed-db

# Эсвэл хоёуланг нь нэг дор ажиллуулах
npm run setup-and-seed
```

5. Хөгжүүлэлтийн серверийг ажиллуулах:

```bash
npm run dev
```

6. Админ хэсэгт нэвтрэх:

Админ хэсэгт нэвтрэхийн тулд дараах мэдээллийг ашиглана:

- URL: http://localhost:3000/admin/login
- Имэйл: admin@example.com
- Нууц үг: password

## Сайтны бүтэц

- **Нүүр хуудас** (`/`) - Эмнэлгийн танилцуулга, үйлчилгээнүүд
- **Мөнгөнзул эмчийн тухай** (`/about`) - Эмчийн намтар, мэргэшил
- **Хүүхдийн эмчилгээ** (`/children-dentistry`) - Хүүхдийн шүдний эмчилгээний тухай
- **Циркон бүрээс** (`/zircon-crowns`) - Циркон бүрээсний үйлчилгээний тухай
- **Цаг захиалга** (`/booking`) - Цаг захиалах форм
- **eShop** (`/shop`) - Шүдний эрүүл мэндийн бүтээгдэхүүний дэлгүүр
- **Холбоо барих** (`/contact`) - Холбоо барих мэдээлэл, хаяг

## Өгөгдлийн сангийн моделууд

- `Post` - Блог постууд
- `Service` - Үйлчилгээний мэдээлэл
- `Booking` - Цаг захиалгын мэдээлэл
- `Product` - Бүтээгдэхүүний мэдээлэл
- `Order` - Захиалгын мэдээлэл
- `OrderItem` - Захиалгын бүтээгдэхүүний мэдээлэл

## API Endpoints

### Үйлчилгээнүүд
- `GET /api/services` - Бүх үйлчилгээг авах
- `GET /api/services/:id` - Тодорхой үйлчилгээний мэдээлэл авах
- `POST /api/services` - Шинэ үйлчилгээ үүсгэх (админ эрхтэй)
- `PUT /api/services/:id` - Үйлчилгээний мэдээлэл шинэчлэх (админ эрхтэй)
- `DELETE /api/services/:id` - Үйлчилгээ устгах (админ эрхтэй)

### Бүтээгдэхүүнүүд
- `GET /api/products` - Бүх бүтээгдэхүүнийг авах
- `GET /api/products/:id` - Тодорхой бүтээгдэхүүний мэдээлэл авах
- `POST /api/products` - Шинэ бүтээгдэхүүн үүсгэх (админ эрхтэй)
- `PUT /api/products/:id` - Бүтээгдэхүүний мэдээлэл шинэчлэх (админ эрхтэй)
- `DELETE /api/products/:id` - Бүтээгдэхүүн устгах (админ эрхтэй)

### Цаг захиалга
- `GET /api/bookings` - Бүх цаг захиалгыг авах (админ эрхтэй)
- `GET /api/bookings/:id` - Тодорхой цаг захиалгын мэдээлэл авах (админ эрхтэй)
- `POST /api/bookings` - Шинэ цаг захиалга үүсгэх
- `PUT /api/bookings/:id` - Цаг захиалгын мэдээлэл шинэчлэх (админ эрхтэй)
- `DELETE /api/bookings/:id` - Цаг захиалга устгах (админ эрхтэй)

### Захиалгууд
- `GET /api/orders` - Бүх захиалгыг авах (админ эрхтэй)
- `GET /api/orders/:id` - Тодорхой захиалгын мэдээлэл авах
- `POST /api/orders` - Шинэ захиалга үүсгэх
- `PUT /api/orders/:id` - Захиалгын мэдээлэл шинэчлэх (админ эрхтэй)
- `DELETE /api/orders/:id` - Захиалга устгах (админ эрхтэй)

### Тохиргоо
- `GET /api/settings` - Сайтын тохиргоог авах
- `POST /api/settings` - Сайтын тохиргоог шинэчлэх (админ эрхтэй)

## Хөгжүүлэлтийн заавар

### Prisma Studio ашиглах

Prisma Studio нь өгөгдлийн сангийн мэдээллийг харах, засах хэрэгсэл юм:

```bash
npx prisma studio
```

### Шинэ хуудас нэмэх

1. `src/app` хавтаст шинэ хавтас үүсгэх
2. `page.tsx` файл үүсгэх
3. Шаардлагатай бол `layout.tsx` файл үүсгэх

### Компонент нэмэх

1. `src/components` хавтаст шинэ компонент үүсгэх
2. Компонентыг импортлож ашиглах

## Бүтээсэн

Мөнгөндент шүдний эмнэлгийн вэбсайт © 2024
