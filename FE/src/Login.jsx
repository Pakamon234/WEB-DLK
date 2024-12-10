// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate để điều hướng
import { jwtDecode } from 'jwt-decode'; 
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);  
    const navigate = useNavigate();  // Hook navigate để điều hướng

    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn chặn reload trang
        setIsLoading(true);  // Hiển thị trạng thái loading

        // Kiểm tra xem tên đăng nhập và mật khẩu có trống không
        if (!username || !password) {
            setMessage("Tên đăng nhập và mật khẩu không được để trống!");
            setIsLoading(false);
            return;
        }

        try {
            // Gửi request đăng nhập
            const response = await axios.post('http://127.0.0.1:7777/login', { username, password });

            setMessage(response.data.msg);  // Hiển thị thông báo từ server

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);  // Lưu token vào localStorage

            // Giải mã token
            const decodedToken = jwtDecode(response.data.token); // Giải mã token

            const role = decodedToken.sub.role;  // Lấy role từ sub
            const userID = decodedToken.sub.userID;  // Lấy userID từ sub
            const username = decodedToken.sub.username;  // Lấy username từ sub
//  // In ra thông tin token trong terminal để kiểm tra
//  console.log("Decoded Token:", decodedToken);
//  console.log("Role:", decodedToken.role);  // In ra role
//  console.log("UserID:", decodedToken.userID);  // In ra userID
//  console.log("Username:", decodedToken.username);  // In ra username
                alert("Đăng nhập thành công!");
                // Chuyển hướng dựa trên role
                if (role === "1") {
                    navigate("/admin");  // Điều hướng tới trang admin
                } else {
                    navigate("/user");  // Điều hướng tới trang user
                }
            }
        } catch (error) {
            // Xử lý lỗi khi đăng nhập
            if (error.response) {
                setMessage(error.response.data.msg);  // Lấy thông báo lỗi từ server
            } else {
                setMessage("Đã xảy ra lỗi không xác định!");
            }
        } finally {
            setIsLoading(false);  // Đóng loading khi hoàn tất
        }
    };

    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
            {message && <p>{message}</p>} {/* Hiển thị thông báo */}
        </div>
    );
};

export default Login;
