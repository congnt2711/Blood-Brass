# Blood & Brass

`Blood & Brass` là một browser RPG one-page viết bằng HTML, CSS và JavaScript thuần.

Phiên bản hiện tại đã có:

- Dungeon theo cấp với timer và hoàn tất offline
- Đấu trường dùng stamina riêng
- Boss mốc cấp với thưởng lớn một lần
- Inventory thật: equip thủ công hoặc bán đồ
- Chợ đêm theo tier, có thể làm mới bằng vàng
- Camp hồi máu và năng lượng
- Save local bằng `localStorage`

## Chạy local

Vì đây là static site, chỉ cần mở `index.html` trong trình duyệt hoặc chạy một static server đơn giản.

Ví dụ với Node:

```bash
npx serve .
```

## Deploy GitHub Pages

Repo đã kèm workflow tại `.github/workflows/deploy-pages.yml`.

Sau khi đẩy code lên GitHub:

1. Vào `Settings` của repo.
2. Mở mục `Pages`.
3. Trong `Build and deployment`, chọn `Source: GitHub Actions`.
4. Push lên branch chính (`main` hoặc `master` tùy repo).
5. Chờ workflow hoàn tất, site sẽ xuất hiện ở URL GitHub Pages của repo.

## Hướng phát triển tiếp

- Tách inventory thành rarity, set bonus hoặc affix
- Thêm quest chain hoặc daily objectives
- Đưa timer/combat sang backend khi cần chống cheat và đồng bộ nhiều thiết bị
