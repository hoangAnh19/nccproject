# Đánh giá chất lượng nhà cung cấp CNTT

Ứng dụng web quản lý nhà cung cấp, cấu hình bộ tiêu chí đánh giá, chấm điểm, xếp hạng và báo cáo tổng quan. Luồng chính dùng API và MySQL thật, không có mock fallback khi API lỗi.

## Kiến trúc

- `apps/web`: Next.js App Router, React, TypeScript, Tailwind CSS
- `apps/api`: NestJS, TypeScript, TypeORM, class-validator
- `docker-compose.yml`: MySQL, API, Web

## Chạy bằng Docker

```bash
docker compose up --build
```

- Web local: http://localhost:9100
- API local: http://localhost:9200
- Web server: http://13.212.248.168:9100
- API server: http://13.212.248.168:9200
- MySQL: localhost:13306

API container kết nối MySQL bằng service name `mysql`. Web container dùng `API_URL=http://api:3001` cho server-side và `NEXT_PUBLIC_API_URL=http://13.212.248.168:9200` cho browser.

## Chạy local

Yêu cầu Node.js 20+ và MySQL đang chạy.

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
npm run dev
```

Biến môi trường API:

- `PORT=3001`
- `DB_HOST=localhost`
- `DB_PORT=13306`
- `DB_USER=ncc_user`
- `DB_PASSWORD=ncc_pass`
- `DB_NAME=ncc_db`
- `DB_SYNC=true`
- `WEB_ORIGIN=http://13.212.248.168:9100`

## Seed data

Khi database trống, API tự seed:

- 8 nhà cung cấp CNTT
- 4 nhà cung cấp đã đánh giá và 4 nhà cung cấp chưa đánh giá
- Cấu hình mặc định `Bộ tiêu chí đánh giá NCC CNTT 2026`
- 4 nhóm A/B/C/D với trọng số 25/30/30/15
- 14 tiêu chí con
- Thang điểm 1-5
- Rank A/B/C/D: 85-100, 70-84.99, 55-69.99, 0-54.99

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

```bash
npm run build
docker compose up --build
curl http://localhost:9200/health
curl http://localhost:9200/suppliers
curl http://localhost:9200/evaluation-configs/default/form-schema
curl http://localhost:9200/reports/summary
```

Khi kiểm tra từ máy khác:

```bash
curl http://13.212.248.168:9200/health
```
