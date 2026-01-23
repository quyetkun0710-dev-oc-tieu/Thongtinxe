// ================== CONFIG ==================
const LOGIN_API = "https://script.google.com/macros/s/AKfycbxfZ90wajx1jGl_bUpsDlM3vlpHCyz5GvAhbLsTEGVBnQhzITRwlExbGqmqflZQL1SaeA/exec";

// ================== LOGIN ==================
function login(){
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  msg.textContent = "";

  if(!username || !password){
    msg.textContent = "Vui lòng nhập username và password";
    return;
  }

  fetch(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body:
      "username=" + encodeURIComponent(username) +
      "&password=" + encodeURIComponent(password)
  })
  .then(res => res.json())
  .then(data => {
    if(!data.ok){
      msg.textContent = data.msg || "Đăng nhập thất bại";
      return;
    }

    // ===== LƯU PHIÊN =====
    localStorage.setItem("user", data.user);
    localStorage.setItem("role", data.role);

    // ===== CHUYỂN VÀO APP CHÍNH =====
    window.location.href = "index.html";
  })
  .catch(() => {
    msg.textContent = "Không kết nối được máy chủ";
  });
}

// ================== ENTER ĐỂ LOGIN ==================
document.addEventListener("keydown", e=>{
  if(e.key === "Enter"){
    login();
  }
});
