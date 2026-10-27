let hoTen = "Vo Anh Tai";
let namSinh = 2006;
let laSinhVien = true;
let diemTB = 7.5;

console.log("Họ tên: " + hoTen + " Năm sinh: " + namSinh + " Là sinh viên: " + laSinhVien + " Điểm trung bình: " + diemTB);
console.log("Kiểu hoTen: " + typeof hoTen);
console.log("kiểu namSinh: " + typeof namSinh);
console.log("Kiểu laSinhVien: " + typeof laSinhVien);
console.log("Kiểu diemTB: " + typeof diemTB);

let C = 25;
let F = C* 9/5 + 32;
console.log(C + " Độ C = " + F + " Độ F ");

let so = 15;
console.log(so + " Số chia hết cho 3 " +(so % 3 === 0));

console.log('"5" + 3 =', "5" + 3);
console.log('"5" - 3 =', "5" - 3);
console.log(' 5 === "5" =', 5 === "5");
console.log('true + true =', true + true);
console.log('typeof null =', typeof null);

let a = "133";
let b = 0;
let c = "Xin chào";
console.log("Number(a): ", Number(a));
console.log("String(b): ", String(b));
console.log("Boolean(c): ", Boolean(c));

function phanLoaiDiem(diem) {
    if (diem > 8) return "Giỏi";
    else if (diem >= 6.5) return "Khá";
    else if (diem >= 5) return "Trung bình";
    else return "Yếu";
}

let mangDiem = [9, 7 ,6.5 ,5 ,4 , 8.5];
for (let i = 0; i <mangDiem.length; i++) {
    console.log("Điểm: " +  mangDiem[i] + " => " + phanLoaiDiem(mangDiem[i]));
}

let n = 6
console.log("Bảng cửu chương của " + n);
for (let i = 1; i < 10; i++) {
    console.log(n + " x " + i + " = " + (n * i));
}

for (let num = 2; num <= 30; num++) {
    let laNguyenTo = true;
    for (let j = 2; j < num; j++) {
        if (num % j === 0) {
            laNguyenTo = false;
            break;
        }
    }
    if (laNguyenTo) {
        console.log(num + " là số nguyên tố");
    }
}

function tinhGiaiThua(n) {
    let kq = 1;
    for (let i = 1; i <= n; i++) {
        kq *= i;
    }
    return kq;
}
console.log("5! = " + tinhGiaiThua(5));
const laSochan = function(n) {
    return n % 2 === 0;
};
console.log("4 là số chẵn? " + laSochan(4));
const timSoLonNhat = (mang) => {
    let max = mang[0];
    for (let i = 1; i < mang.length; i++) {
        if (mang[i] > max) max = mang[i];
    }
    return max;
}
console.log("Số lớn nhất: " + timSoLonNhat([3, 4, 2, 8, 10]));

console.log(f);
var f = 10;

let danhSachSinhVien = [
    {hoTen: "Nguyen Van A", diem: 8.5 },
    {hoTen: "Tran Thi B", diem: 7.0 },
    {hoTen: "Le Van C", diem: 5.5 },
    {hoTen: "Pham Thi D", diem: 4.0 },
    {hoTen: "Hoang Van E", diem: 9.2 }
];
