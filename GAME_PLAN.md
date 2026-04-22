# Blood & Brass

## Tầm nhìn

`Blood & Brass` là web game nhập vai chiến thuật kiểu asynchronous browser RPG, lấy cảm hứng từ `Gladiatus` và `BiteFight` nhưng đẩy mạnh bối cảnh `gothic-industrial dark fantasy`.

Người chơi không điều khiển trực tiếp theo thời gian thực, mà tối ưu:

- Nhịp hồi tài nguyên
- Dungeon theo cấp
- Trang bị và tier chợ đêm
- Đấu trường tiêu hao stamina
- Uy danh, cấp độ và mở khóa nội dung

## Bản prototype hiện tại

Phiên bản hiện tại là bản frontend một trang, chạy hoàn toàn phía client với:

- Lưu tiến trình bằng `localStorage`
- Giao diện gọn lại theo cụm: hồ sơ, dungeon, đấu trường, chợ đêm, trang bị, nhật ký
- Font đổi sang bộ hỗ trợ tiếng Việt tốt hơn
- `Energy` hồi `+1 / phút`
- `Stamina đấu trường` tối đa `10`, hồi `+1 / giờ`
- Dungeon số 1 đến số 5 với yêu cầu cấp để vào
- Chợ đêm có vật phẩm đa dạng mở theo level
- Tự động trang bị món tốt hơn ở cùng slot
- Hoàn tất nhiệm vụ khi quay lại sau thời gian offline

## Vòng lặp cốt lõi

1. Vào game và nhận lại tài nguyên được hồi theo thời gian.
2. Chọn dungeon phù hợp level để farm vàng, XP và loot.
3. Mua trang bị trong chợ đêm theo tier cấp hiện tại.
4. Thách đấu đối thủ ở đấu trường bằng stamina để tăng uy danh.
5. Lên cấp, mở dungeon khó hơn và chợ đêm nhiều đồ hơn.

## Hướng phát triển tiếp

### Giai đoạn 1: Vertical Slice hoàn chỉnh

- Thêm inventory thật thay vì chỉ auto-equip
- Cho phép so sánh đồ đang mặc và đồ mới
- Thêm boss mốc cấp cho từng cụm dungeon
- Reset shop theo ngày hoặc theo mốc cấp

### Giai đoạn 2: Persistence thật

- Backend lưu tài khoản
- Lưu inventory, cooldown, mission timer phía server
- Đồng bộ tiến trình giữa nhiều thiết bị

### Giai đoạn 3: Social Systems

- PvP async qua battle log
- Bang hội / phe phái
- Chợ đấu giá
- World boss hoặc chiến bang hội

## Kiến trúc nên dùng khi nâng cấp

Frontend:

- `React + Vite`

Backend:

- `Node.js + Express/Nest`
- `PostgreSQL`
- `Redis`

Nguyên tắc hệ thống:

- Combat resolution phía server
- Timer nhiệm vụ authoritative phía server
- Chống cheat dựa trên signed action hoặc server time
