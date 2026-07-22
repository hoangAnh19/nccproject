# Đánh giá chất lượng nhà cung cấp CNTT

Ứng dụng web quản lý nhà cung cấp, cấu hình bộ tiêu chí đánh giá, chấm điểm, xếp hạng và báo cáo tổng quan.

## Kiến trúc

- `apps/web`: Next.js App Router, React, TypeScript, Tailwind CSS
- `apps/api`: NestJS, TypeScript, TypeORM, class-validator
- `docker-compose.yml`: MySQL, API, Web

## Chạy Docker local

Không cần tạo `.env`; compose sẽ mặc định dùng localhost.

```bash
docker compose up --build -d
```

- Web local: http://localhost:9100
- API local: http://localhost:9200
- MySQL: localhost:13306

## Deploy server

Server IP hiện tại: `13.212.248.168`.

```bash
cp .env.server.example .env
docker compose up --build -d
```

- Web server: http://13.212.248.168:9100
- API server: http://13.212.248.168:9200

Nếu đổi IP/domain, chỉ cần sửa `.env`:

```env
WEB_PUBLIC_URL=http://your-domain-or-ip:9100
API_PUBLIC_URL=http://your-domain-or-ip:9200
```

## Chạy local không Docker

Yêu cầu Node.js 20+ và MySQL đang chạy.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

Biến môi trường API local:

- `PORT=3001`
- `DB_HOST=localhost`
- `DB_PORT=13306`
- `DB_USER=ncc_user`
- `DB_PASSWORD=ncc_pass`
- `DB_NAME=ncc_db`
- `DB_SYNC=true`
- `WEB_ORIGIN=http://localhost:9100`

## Seed data

Khi database trống, API tự seed:

- 8 nhà cung cấp CNTT
- 4 nhà cung cấp đã đánh giá và 4 nhà cung cấp chưa đánh giá
- Cấu hình mặc định `Bộ tiêu chí đánh giá NCC CNTT 2026`
- 4 nhóm A/B/C/D với trọng số 25/30/30/15
- 14 tiêu chí con
- Thang điểm 1-5
- Rank A/B/C/D: 85-100, 70-84.99, 55-69.99, 0-54.99

Seed bổ sung 30 nhà cung cấp và các kỳ 2025/2026:

```bash
docker compose exec -T mysql mysql -uncc_user -pncc_pass ncc_db < database/seed-extra-30-suppliers-evaluations.sql
```

## Endpoint chính

- `GET /health`
- `GET /suppliers`
- `GET /suppliers/:id`
- `POST /suppliers`
- `PATCH /suppliers/:id`
- `DELETE /suppliers/:id`
- `GET /evaluation-configs/default`
- `GET /evaluation-configs/default/form-schema`
- `GET /evaluations`
- `GET /evaluations/:id`
- `POST /evaluations`
- `GET /reports/summary`
- `GET /reports/rank-distribution`
- `GET /reports/top-suppliers`

## Admin API

- `GET /admin/evaluation-configs`
- `POST /admin/evaluation-configs`
- `GET /admin/evaluation-configs/:id`
- `PATCH /admin/evaluation-configs/:id`
- `DELETE /admin/evaluation-configs/:id`
- `POST /admin/evaluation-configs/:id/set-default`
- `GET /admin/evaluation-configs/:id/preview`
- `POST /admin/evaluation-configs/:id/preview-score`

## Kiểm tra

Local:

```bash
curl http://localhost:9200/health
curl http://localhost:9200/suppliers
curl http://localhost:9200/evaluation-configs/default/form-schema
curl http://localhost:9200/reports/summary
```

Server:

```bash
curl http://13.212.248.168:9200/health
```
