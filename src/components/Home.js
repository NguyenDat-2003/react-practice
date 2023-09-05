function Home() {
  return (
    <div className="home-container">
      <div>
        <b>PHÂN TÍCH YÊU CẦU</b>
      </div>
      <div>Sử dụng API từ trang web https://reqres.in/ để tạo website </div>
      <ul>
        Sử dụng framework ReactJS
        <li>1. Đăng nhập</li>
        <li>2. Thêm User</li>
        <li>3. Sửa User</li>
        <li>4. Xóa User</li>
        <li>5. Hiển thị tất cả User</li>
        <li>6. Tìm kiếm User theo ID</li>
        <li>7. Sắp xếp theo first name</li>
        <li>8. Import User từ file .csv</li>
        <li>9. Export User ra file .csv</li>
      </ul>
      Triển khai website lên Heroku để demo
    </div>
  );
}

export default Home;
