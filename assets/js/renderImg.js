const data = [
  {
    img: "/images/dt.jpg",
    name: "Phan Phụng Hùng",
    cp: "Chi phái Điện Thọ",
    detail: "Thông tin chi tiết về Tín hữu A"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Phan Phụng Quốc",
    cp: "Chi phái Điện Thọ",
    detail: "Tín hữu B đã tham gia sinh hoạt vào tháng 5"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Trần Thanh",
    cp: "Chi phái Điện Hồng",
    detail: "Hoạt động cộng đồng của Tín hữu C"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Huỳnh Thị Huệ",
    cp: "Hội nhánh Đại Hòa",
    detail: "Thông tin chi tiết về Tín hữu A"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Huỳnh Anh",
    cp: "Hội nhánh Đại Hòa",
    detail: "Tín hữu B đã tham gia sinh hoạt vào tháng 5"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Trần Thượng Trung",
    cp: "Hội nhánh Điện Phước",
    detail: "Hoạt động cộng đồng của Tín hữu C"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Hoàng Vũ",
    cp: "Hội nhánh Điện Phước",
    detail: "Thông tin chi tiết về Tín hữu A"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Phan Minh Thanh",
    cp: "Chi phái Điện Thọ",
    detail: "Tín hữu B đã tham gia sinh hoạt vào tháng 5"
  },
  {
    img: "https://res.cloudinary.com/deyvwamak/image/upload/v1728097312/Myevent/avatar/laupyblnilxknkka1kmk.png",
    name: "Trần Phương",
    cp: "Chi phái Điện Hồng",
    detail: "Hoạt động cộng đồng của Tín hữu C"
  }
];

// Hàm render thẻ tín hữu
function renderCards(filteredData) {
  const container = document.getElementById("item-container");
  container.innerHTML = "";

  filteredData.forEach(item => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card">
        <img src="${item.img}" alt="${item.name}">
        <div class="card-body">
          <h3><a href="#">Gia đình ông/bà ${item.name}</a></h3>
          <div class="card-content">
            <div class="propery-info">${item.cp}</div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}
function handleTabSelect1() {
  const dropdown = document.getElementById("tabDropdown1");
  const selectedValue1 = dropdown.value;

  if (selectedValue1) {
    showTab(selectedValue1);
  }
}

// Gắn sự kiện sau khi DOM load xong
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll('button[data-tab]');
  const defaultGallery = document.getElementById("default-gallery");
  const customGallery = document.getElementById("custom-gallery");
  const backBtn = document.getElementById("back-btn");
  const container1 = document.getElementById("container1");
  const b3 = document.getElementById("b3");
  const b1 = document.getElementById("b1");
  const b2 = document.getElementById("b2");
  const b33 = document.getElementById("3");
  const b31 = document.getElementById("1");
  const b32 = document.getElementById("2");
  const sl = document.getElementById("soluoc");
  const sk = document.getElementById("gdsk");
  const ht = document.getElementById("gdht");
  const g34 = document.getElementById("1934");
  const g65 = document.getElementById("1965");
  const g15 = document.getElementById("2015");
  const lk = document.getElementById("LK");
  const tn = document.getElementById("36");
  const tt = document.getElementById("35");
  const tnien = document.getElementById("37");
  const pn = document.getElementById("34");
  const ttn = document.getElementById("33");
  const dd = document.getElementById("30");
  const tg = document.getElementById("31");
  const cn = document.getElementById("32");
  const an = document.getElementById("38");
  const ttam = document.getElementById("39");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const cp = button.getAttribute("data-cp");
      const filtered = data.filter(item => item.cp === cp);
      renderCards(filtered);

      // Hiển thị phần custom
      defaultGallery.style.display = "none";
      customGallery.style.display = "flex";
      container1.style.display = "flex";
    });
  });
  sl.addEventListener("click", () => {
    sl.style.display = "none";
  });
  sk.addEventListener("click", () => {
    sk.style.display = "none";
  });
  ht.addEventListener("click", () => {
    ht.style.display = "none";
  });
  g34.addEventListener("click", () => {
    g34.style.display = "none";
  });
  g65.addEventListener("click", () => {
    g65.style.display = "none";
  });
  g15.addEventListener("click", () => {
    g15.style.display = "none";
  });
  lk.addEventListener("click", () => {
    lk.style.display = "none";
  });
  tn.addEventListener("click", () => {
    tn.style.display = "none";
  });
  tt.addEventListener("click", () => {
    tt.style.display = "none";
  });
  tnien.addEventListener("click", () => {
    tnien.style.display = "none";
  });
  pn.addEventListener("click", () => {
    pn.style.display = "none";
  });
  ttn.addEventListener("click", () => {
    ttn.style.display = "none";
  });

  dd.addEventListener("click", () => {
    dd.style.display = "none";
  });
  cn.addEventListener("click", () => {
    cn.style.display = "none";
  });
  tg.addEventListener("click", () => {
    tg.style.display = "none";
  });
  ttam.addEventListener("click", () => {
    ttam.style.display = "none";
  });
  an.addEventListener("click", () => {
    an.style.display = "none";
  });
  b2.addEventListener("click", () => {
    b32.style.display = "none";
  });
  b1.addEventListener("click", () => {
    b31.style.display = "none";
  });
  b3.addEventListener("click", () => {
    b33.style.display = "none";
  });

  // Xử lý nút quay lại
  backBtn.addEventListener("click", () => {
    customGallery.style.display = "none";
    defaultGallery.style.display = "flex";
    container1.style.display = "none";
  });
});

function handleTabSelect() {
  const dropdown = document.getElementById("tabDropdown");
  const selectedValue = dropdown.value;

  if (selectedValue) {
    showTab(selectedValue);
  }
}
