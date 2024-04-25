import { useEffect, useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { login } from "./authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const error = useAppSelector(state => state.auth.error);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (error) {
            message.error(error); 
        }
    }, [error]);
    const handleLogin = () => {
        dispatch(login({ login: username, password }));
    };

    return <></>
}
export default Login