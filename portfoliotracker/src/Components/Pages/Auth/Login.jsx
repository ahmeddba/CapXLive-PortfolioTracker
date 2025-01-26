import React, { useContext, useState } from 'react';
import loginanimation from '../../Animations/login.json';
import { Button, Form, Input } from 'antd';
import Lottie from 'lottie-react';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router';

const Login = () => {
    
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { state, login } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials); // Call the login function
      sessionStorage.getItem('token') && navigate('/see-stocks'); // Navigate to the "see-stocks" page on success
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally handle errors (e.g., display an error message)
    }
  };

  return (
    <div className="containerhome">
      <div className="desc">
        <h1>
          <i className="titlee">
            <span className="titlespan">Welcome! </span>Let's{' '}
            <span className="titlespan">Grow Your Portfolio </span>Together
          </i>
        </h1>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 40,
          }}
          style={{
            width: '100%',
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input name="email" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
              Start Investing
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="animation">
        <Lottie
          animationData={loginanimation}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Login;
