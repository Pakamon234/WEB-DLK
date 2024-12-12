import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, decodeToken } from '../services/authService';
import FormInput from '../components/FormInput';
import Message from '../components/Message';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!username || !password) {
            setMessage("Tên đăng nhập và mật khẩu không được để trống!");
            setIsLoading(false);
            return;
        }

        try {
            const data = await login(username, password);

            // Kiểm tra xem token có hợp lệ không
            if (!data.token) {
                setMessage("Không nhận được token từ server");
                setIsLoading(false);
                return;
            }

            // Giải mã token để lấy thông tin người dùng
            const decodedToken = decodeToken(data.token);

            // Kiểm tra xem token có hợp lệ không
            if (decodedToken.exp < Date.now() / 1000) {
                setMessage("Token đã hết hạn. Vui lòng đăng nhập lại.");
                setIsLoading(false);
                return;
            }

            // Lưu token vào localStorage
            localStorage.setItem('token', data.token);

            // Điều hướng người dùng theo vai trò
            const { role } = decodedToken.sub;
            alert("Đăng nhập thành công!");
            navigate(role === "1" ? "/admin" : "/user");
        } catch (error) {
            // Hiển thị thông báo lỗi chi tiết
            setMessage(error.response?.data?.msg || "Đã xảy ra lỗi không xác định!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Đăng nhập</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Tên đăng nhập"
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <FormInput
                    label="Mật khẩu"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                </button>
            </form>
            <Message message={message} />
        </div>
    );
};

export default Login;
