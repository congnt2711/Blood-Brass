# Project Memory

File này dùng để ghi lại các yêu cầu vận hành và các quyết định cần nhớ khi tiếp tục làm việc trong dự án `Blood & Brass`.

## Quy tắc làm việc

- Sau mỗi lần cập nhật game, phải `commit` và `push` ngay lên GitHub `main`, không chờ nhắc lại.
- Repo GitHub hiện tại: `https://github.com/congnt2711/Blood-Brass`
- Bản public chạy online qua GitHub Pages tại:
  - `https://congnt2711.github.io/Blood-Brass/`

## Tài khoản và lưu tiến trình

- Game đã dùng cơ chế tài khoản local trong trình duyệt, không còn save vô danh.
- Tiến trình được tự động lưu theo từng tài khoản.
- Không dùng nút lưu thủ công hoặc xóa save thủ công nữa.
- Dữ liệu account hiện tại đang lưu bằng `localStorage`.
- PvP hiện tại là local PvP giữa các tài khoản đã từng được tạo trong cùng trình duyệt/máy, chưa phải multiplayer online thật.

## Gameplay hiện tại cần giữ

- Khi lên level:
  - Hồi đầy máu
  - Hồi đầy mana
  - Hồi đầy stamina
- Mana:
  - Khởi điểm `20`
  - Mỗi level tăng `+2 max mana`
- Stamina:
  - Mỗi level tăng `+1 max stamina`
  - Hồi `+1` mỗi `10 phút`
  - Mỗi level giảm thời gian hồi `2 giây`
- Shop:
  - Có thể refresh bằng vàng
  - Tự refresh mỗi `60 phút`
  - Phải hiển thị so sánh đồ đang bán với đồ đang mặc để tránh mua hớ
- Boss:
  - Sau khi bị hạ sẽ hồi lại sau `60 phút`
  - Các phần có hồi phục/reset phải có countdown hiển thị

## Trang bị và phẩm cấp

- Hệ thống phẩm cấp đang dùng:
  - `Trắng`
  - `Xanh lam`
  - `Xanh dương`
  - `Tím`
  - `Vàng`
  - `Đỏ`
- Mỗi phẩm cấp tăng giá trị theo cấp số nhân x2 qua từng bậc.
- Level càng cao thì chênh lệch giá trị giữa các phẩm càng phải rõ hơn.
- Màn `Nhân vật` đang được thiết kế theo hướng giống `Gladiatus`:
  - Hồ sơ nhân vật
  - Paper-doll equipment
  - Inventory trong cùng một màn hình

## Ghi chú kỹ thuật

- Frontend hiện là static site thuần:
  - `index.html`
  - `styles.css`
  - `app.js`
- Nếu sau này muốn PvP online thật giữa nhiều người chơi khác máy, cần làm backend + database thay vì chỉ `localStorage`.
