function toast({
  title = '',
  message = '',
  type = 'info',
  duration = 3000
}) {
  const main = document.getElementById('toast');
  if (main) {
      const toast = document.createElement('div');

      // auto remove toast
      const autoremoveId = setTimeout(function() {
          main.removeChild(toast);
      }, duration + 1000);

      // remove toast when click
      toast.onclick = function(e) {
          if (e.target.closest('.toast__close')) {
              main.removeChild(toast);
              clearTimeout(autoremoveId);
          }
      }

      const icons = {
          success: 'fa-solid fa-circle-check',
          info: 'fa-solid fa-info',
          warning: 'fa-solid fa-circle-exclamation',
          error: 'fa-solid fa-bug',
      }
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);

      toast.classList.add('toast', `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
      toast.innerHTML = `
      <div class="toast__icon">
          <i class="${icon}"></i>
      </div>
      <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
      </div>
      <div class="toast__close">
          <i class="fa-solid fa-xmark"></i>
      </div>
  `;
      main.appendChild(toast);

  }
}

toast({
title: 'Thành công!',
message: 'Bạn đã đăng ký thành công tài khoản tại F8.',
type: 'success',
duration: 3000
});

toast({
title: 'Thông tin!',
message: 'Thông tin tài khoản của bạn tại F8.',
type: 'info',
duration: 3000
});

toast({
title: 'Cảnh báo!',
message: 'Bạn cần điền đầy đủ thông tin',
type: 'warning',
duration: 3000
});

toast({
title: 'Thất bại!',
message: 'Có lỗi xảy ra, vui lòng liên hệ quản trị viên.',
type: 'error',
duration: 3000
});

function showSuccessToast() {
  toast({
  title: "Thành công!",
  message: "Bạn đã đăng ký thành công tài khoản tại F8.",
  type: "success",
  duration: 5000
  });
}
function showErrorToast() {
  toast({
  title: "Thất bại!",
  message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
  type: "error",
  duration: 5000
  });
}