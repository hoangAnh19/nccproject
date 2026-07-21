# nccproject

Ứng dụng đánh giá chất lượng nhà cung cấp CNTT, đã chuyển từ giao diện PHP tĩnh sang stack:

- Frontend: Next.js, Tailwind CSS
- Backend: NestJS, TypeORM
- Database: MySQL
- Runtime: Docker Compose

## Chạy bằng Docker

```bash
docker compose up --build
```

Sau khi container chạy:

- Web: http://localhost:13000
- API: http://localhost:13001
- MySQL: localhost:13306

API sẽ tự tạo bảng và seed dữ liệu mẫu khi database trống.

## Chạy local không Docker

Yêu cầu Node.js 20+ và MySQL đang chạy.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

Các endpoint chính:

- `GET /health`
- `GET /suppliers`
- `POST /suppliers`
- `GET /evaluations`
- `GET /reports/summary`

Code PHP gốc vẫn được giữ trong `FE/` để đối chiếu giao diện.
