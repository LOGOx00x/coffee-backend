let menus = [];
let cart = [];

async function loadMenus() {
  try {
    const res = await fetch("http://localhost:3000/api/menus");
    const json = await res.json();
    menus = json.data;

    document.getElementById("menu-list").innerHTML = menus
      .map(
        (m, index) => `
            <button onclick="addToCart(${index})" class="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-500 text-left">
                <div class="font-bold text-lg">${m.menu_name}</div>
                <div class="text-blue-600 font-bold mt-2">${m.price} ฿</div>
            </button>
        `,
      )
      .join("");
  } catch (err) {
    alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  }
}

function addToCart(index) {
  const selected = menus[index];
  cart.push({
    menu_id: selected.menu_id,
    menu_name: selected.menu_name,
    price: Number(selected.price),
  });
  renderCart();
}

function renderCart() {
  let total = 0;
  const cartDiv = document.getElementById("cart-list");

  if (cart.length === 0) {
    cartDiv.innerHTML = "ยังไม่มีสินค้า...";
    return;
  }

  cartDiv.innerHTML = cart
    .map((item, i) => {
      total += item.price;
      return `
            <div class="flex justify-between border-b py-3">
                <div><b>${item.menu_name}</b></div>
                <div class="flex gap-4">
                    <span class="text-blue-600 font-bold">${item.price} ฿</span>
                    <button onclick="cart.splice(${i}, 1); renderCart();" class="text-red-500 font-bold">X</button>
                </div>
            </div>
        `;
    })
    .join("");

  cartDiv.innerHTML += `<div class="text-2xl font-bold text-right mt-4 text-blue-600">รวม: ${total} ฿</div>`;
}

loadMenus();
renderCart();
