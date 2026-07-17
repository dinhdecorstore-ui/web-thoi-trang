# Web Thời Trang — AIR+ Comfort Men

Website thời trang tĩnh hoàn chỉnh, độc lập và có thể deploy trực tiếp lên GitHub Pages.

## Chức năng

- Giao diện responsive cho desktop/tablet/mobile
- Danh sách sản phẩm render bằng JavaScript
- Tìm kiếm, lọc danh mục, lọc giá, sắp xếp
- Xem nhanh sản phẩm, chọn size và màu
- Wishlist lưu bằng localStorage
- Giỏ hàng lưu bằng localStorage
- Mã giảm giá demo: `AIR10`
- Checkout demo, newsletter, form liên hệ, FAQ

## Mở local

Mở file `index.html` trực tiếp bằng trình duyệt hoặc chạy server tĩnh:

```bash
python3 -m http.server 8000
```

Sau đó mở http://localhost:8000

## Deploy miễn phí bằng GitHub Pages

1. Tạo repo GitHub mới, ví dụ `web-thoi-trang`.
2. Upload toàn bộ file trong thư mục này lên repo.
3. Vào **Settings → Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/root`.
6. URL tạm thời miễn phí sẽ có dạng:

```text
https://USERNAME.github.io/web-thoi-trang/
```
