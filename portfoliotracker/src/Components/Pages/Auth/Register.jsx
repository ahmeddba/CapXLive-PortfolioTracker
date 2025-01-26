import Lottie from 'lottie-react';
import registeranimation from '../../Animations/register.json';
import { Button, Form, Input } from 'antd';
import './Register.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { signup } = useContext(AuthContext); // Destructure the signup function from AuthContext
  const [userInfo, setUserInfo] = useState({}); // State to handle new user info

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value })); // Update state dynamically
  };

  const navigate = useNavigate()
  console.log(userInfo)

  const handleSignup = async () => {
    try {
      await signup(userInfo); // Call signup with the userInfo state
      navigate('/login'); // Redirect to a "Welcome" page or another route after successful signup
    } catch (error) {
      console.error('Signup failed:', error);
      // Optionally handle the error, e.g., show a message to the user
    }
  };
  return (
    <div className="containerhome">
      <div className="desc">
        <h1>
          <i className="titlee">
            <span className="titlespan">Join Us</span> and Start Your <span className="titlespan">Investment</span> Journey Today!
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
          autoComplete="on"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input your First Name!',
              },
            ]}
          >
            <Input name="firstName" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your Last Name!',
              },
            ]}
          >
            <Input name="lastName" onChange={handleChange} />
          </Form.Item>
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
            <Button type="primary" htmlType="button" onClick={handleSignup}>
              Join
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="animation">
        <Lottie animationData={registeranimation} loop={true} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
};

export default Register;
