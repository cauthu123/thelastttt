// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js"; // Thêm thư viện Firebase Realtime Database

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTrACWGa0IDRhZYNTYicDDLRR-7xBJH2Y",
    authDomain: "cardlink-3bd0a.firebaseapp.com",
    databaseURL: "https://cardlink-3bd0a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cardlink-3bd0a",
    storageBucket: "cardlink-3bd0a.appspot.com",
    messagingSenderId: "82452055217",
    appId: "1:82452055217:web:0aba023c2d8470697ece90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Khởi tạo Firebase Realtime Database

const profileImage = document.getElementById("profile-image");
const profileName = document.getElementById("profile-name");
const profilecompanyName = document.getElementById("profile-companyName");
const profilePhone = document.getElementById("profile-phone");
const profileDescription = document.getElementById("profile-description"); // Thêm tham chiếu đến trường Description
const profileFacebook = document.getElementById("profile-facebook");
const profileLinkedIn = document.getElementById("profile-linkedin"); // Thay đổi tham chiếu từ profileZalo thành profileLinkedIn



const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
const profileId = urlParams.get("profileId");
if (profileId !== null) {
    // Tham chiếu đến địa chỉ Firebase Realtime Database của profile
    const profileRef = ref(database, `users/${userId}/profiles/${profileId}`);

    // Truy xuất dữ liệu từ Firebase Realtime Database
    get(profileRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const profile = snapshot.val();

                profileImage.src = profile.image;
                profileName.textContent = profile.name;
                profilecompanyName.textContent = profile.companyName;
                profilePhone.href = 'tel:' + profile.phone;
                profileDescription.textContent = profile.description; // Hiển thị trường Description
                profileFacebook.href = profile.facebook;
                profileLinkedIn.href = profile.linkedin;
            } else {
                console.error("Không tìm thấy profile.");
            }
        })
        .catch((error) => {
            console.error("Lỗi khi truy xuất dữ liệu từ Firebase:", error);
        });
}

const copyUrlIcon = document.getElementById("copy-url");

copyUrlIcon.addEventListener("click", () => {
    // Lấy địa chỉ URL hiện tại của trang
    const currentUrl = window.location.href;

    // Tạo một phần tử textarea ẩn để sao chép vào clipboard
    const textArea = document.createElement("textarea");
    textArea.value = currentUrl;
    document.body.appendChild(textArea);

    // Chọn và sao chép nội dung vào clipboard
    textArea.select();
    document.execCommand("copy");

    // Loại bỏ phần tử textarea sau khi sao chép xong
    document.body.removeChild(textArea);

    // Hiển thị thông báo hoặc cập nhật giao diện người dùng khác (tuỳ theo bạn)
    alert("Địa chỉ URL đã được sao chép vào clipboard!");
});

const backButton = document.getElementById("back-to-list");
if (backButton) {
    backButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
}



