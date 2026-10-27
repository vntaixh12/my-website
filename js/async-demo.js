function checkLogin(username, password, callback) {
    setTimeout(() => {
        if (username === "admin" && password === "123") {
            callback(null, { message: "Đăng nhập thành công!" });
        } else {
            callback(new Error("Sai tài khoản hoặc mật khẩu"), null);
        }
    }, 1000);
}

function loginPromise(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "admin" && password === "123") {
                resolve({ message: "Đăng nhập thành công!" });
            } else {
                reject(new Error("Sai tài khoản hoặc mật khẩu"));
            }
        }, 1000);
    });
}

loginPromise("admin", "123")
    .then(result => console.log("yes", result.message))
    .catch(error => console.error("no", error.message));

loginPromise("user", "wrongpass")
    .then(result => console.log("yes", result.message))
    .catch(error => console.error("no", error.message));

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Người dùng 1" });
            } else {
                reject(new Error("Không tìm thấy user"));
            }
        }, 1000);
    });
}

function getOrders(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve([{ orderId: 1, item: "Laptop" }, { orderId: 2, item: "Chuột" }]);
            } else {
                reject(new Error("Không tìm thấy đơn hàng"));
            }
        }, 1000);
    });
}

getUser(1)
    .then(user => {
        console.log("User:", user);
        return getOrders(user.id);
    })
    .then(orders => {
        console.log("Orders:", orders);
    })
    .catch(error => console.error("no", error.message));

Promise.all([getUser(1), getOrders(1)])
    .then(([user, orders]) => {
        console.log("Promise.all kết quả:");
        console.log("User:", user);
        console.log("Orders:", orders);
    })
    .catch(error => console.error("no", error.message));

const apiStatus = document.getElementById("api-status");
const apiRetry = document.getElementById("api-retry");
const apiContent = document.getElementById("api-content");
const userList = document.getElementById("user-list");
const postsList = document.getElementById("posts-list");
const postForm = document.getElementById("postForm");
const postStatus = document.getElementById("postStatus");
const postResult = document.getElementById("postResult");

async function fetchJson(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Lỗi API (HTTP ${response.status})`);
    }
    return response.json();
}

function renderUsers(users) {
    userList.replaceChildren();

    users.forEach(user => {
        const item = document.createElement("li");
        item.textContent = `${user.name} - ${user.email}`;
        userList.append(item);
    });
}

function renderPosts(posts) {
    postsList.replaceChildren();

    posts.forEach(post => {
        const item = document.createElement("li");
        const title = document.createElement("h4");
        const body = document.createElement("p");

        title.textContent = post.title;
        body.textContent = post.body;
        item.append(title, body);
        postsList.append(item);
    });
}

async function loadUsersAndPosts() {
    apiStatus.textContent = "Đang tải người dùng và bài viết...";
    apiRetry.hidden = true;
    apiContent.hidden = true;

    try {
        const [users, posts] = await Promise.all([
            fetchJson("https://jsonplaceholder.typicode.com/users"),
            fetchJson("https://jsonplaceholder.typicode.com/posts")
        ]);

        renderUsers(users);
        renderPosts(posts);
        apiContent.hidden = false;
        apiStatus.textContent = "Đã tải danh sách người dùng và bài viết thành công.";
    } catch (error) {
        apiStatus.textContent = `Không thể tải dữ liệu. Hãy kiểm tra kết nối mạng và thử lại. (${error.message})`;
        apiRetry.hidden = false;
    }
}

apiRetry.addEventListener("click", loadUsersAndPosts);

postForm.addEventListener("submit", async event => {
    event.preventDefault();
    const submitButton = postForm.querySelector('button[type="submit"]');
    const formData = new FormData(postForm);

    submitButton.disabled = true;
    postStatus.textContent = "Đang gửi bài viết...";
    postResult.replaceChildren();

    try {
        const post = await fetchJson("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                title: formData.get("title"),
                body: formData.get("body"),
                userId: 1
            })
        });

        const title = document.createElement("h4");
        const body = document.createElement("p");

        title.textContent = post.title;
        body.textContent = post.body;
        postResult.append(title, body);
        postStatus.textContent = `Tạo bài viết thành công (ID: ${post.id}).`;
        postForm.reset();
    } catch (error) {
        postStatus.textContent = `Không thể tạo bài viết. Vui lòng thử lại. (${error.message})`;
    } finally {
        submitButton.disabled = false;
    }
});

loadUsersAndPosts();

const danhSachSanPham = [
    { id: "laptop", ten: "Laptop", gia: 25000000 },
    { id: "tu-lanh", ten: "Tủ lạnh", gia: 10000000 },
    { id: "dien-thoai", ten: "Điện thoại", gia: 5000000 },
    { id: "tivi", ten: "Tivi", gia: 12000000 }
];
const cartStorageKey = "my-website-cart";
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartStatus = document.getElementById("cart-status");
const clearCartButton = document.getElementById("clear-cart");
const formatCurrency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND"
});

function readCart() {
    try {
        const savedCart = localStorage.getItem(cartStorageKey);
        if (savedCart === null) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);
        if (!Array.isArray(parsedCart) || parsedCart.some(item =>
            !item ||
            !danhSachSanPham.some(product => product.id === item.productId) ||
            !Number.isSafeInteger(item.quantity) ||
            item.quantity < 1
        )) {
            throw new Error("Dữ liệu giỏ hàng không hợp lệ.");
        }

        return parsedCart;
    } catch (error) {
        cartStatus.textContent = `Không thể đọc giỏ hàng đã lưu. Giỏ hàng mới sẽ được tạo. (${error.message})`;
        return [];
    }
}

let gioHang = readCart();

function renderProducts() {
    danhSachSanPham.forEach(product => {
        const item = document.createElement("li");
        const name = document.createElement("h3");
        const price = document.createElement("p");
        const addButton = document.createElement("button");

        item.className = "product-card";
        name.textContent = product.ten;
        price.textContent = formatCurrency.format(product.gia);
        addButton.type = "button";
        addButton.dataset.productId = product.id;
        addButton.textContent = "Thêm vào giỏ";
        item.append(name, price, addButton);
        productList.append(item);
    });
}

function renderCart() {
    cartList.replaceChildren();

    let totalCount = 0;
    let totalPrice = 0;

    gioHang.forEach(cartItem => {
        const product = danhSachSanPham.find(item => item.id === cartItem.productId);
        if (!product) {
            return;
        }

        totalCount += cartItem.quantity;
        totalPrice += product.gia * cartItem.quantity;

        const item = document.createElement("li");
        item.textContent = `${product.ten} — ${cartItem.quantity} × ${formatCurrency.format(product.gia)}`;
        cartList.append(item);
    });

    cartCount.textContent = String(totalCount);
    cartTotal.textContent = formatCurrency.format(totalPrice);
}

function saveCart() {
    try {
        localStorage.setItem(cartStorageKey, JSON.stringify(gioHang));
        cartStatus.textContent = "Giỏ hàng đã được lưu trên trình duyệt.";
    } catch (error) {
        cartStatus.textContent = `Không thể lưu giỏ hàng vào localStorage. (${error.message})`;
    }
}

productList.addEventListener("click", event => {
    const addButton = event.target.closest("button[data-product-id]");
    if (!addButton) {
        return;
    }

    const productId = addButton.dataset.productId;
    const cartItem = gioHang.find(item => item.productId === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        gioHang.push({ productId, quantity: 1 });
    }

    renderCart();
    saveCart();
});

clearCartButton.addEventListener("click", () => {
    gioHang = [];
    renderCart();

    try {
        localStorage.removeItem(cartStorageKey);
        cartStatus.textContent = "Đã xóa toàn bộ giỏ hàng.";
    } catch (error) {
        cartStatus.textContent = `Không thể xóa giỏ hàng đã lưu. (${error.message})`;
    }
});

renderProducts();
renderCart();