import React, {useState,  useEffect} from 'react';
import styled from 'styled-components';
import {router} from "next/client";
import {useRouter} from "next/router";
import {GoogleSignInButton} from "@/pages/components/authButtons";
import { useSession } from "next-auth/react";
import e from 'express';
import ApplicationBackground from "./components/applicationBackground"


const Container = styled.div`
  position: relative; // Establish a stacking context
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
  background-color: #e4e4e7;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const FormArea = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #d6d9f8;
  height: auto;
  width: 450px;
  border: 2px solid #454a68;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #ffce10;
  padding: 10px 0px 20px 0px;
`;

const Title = styled.p`
  color: black;
  font-weight: bold;
  font-size: 25px;
  margin-top: 20px;
`;

const SubTitle = styled.label`
  font-weight: 600;
  margin: 5px 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 10px;
`;

const FormInput = styled.input`
  outline: none;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  width: 290px;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
`;

const LoginButton = styled.button`
  padding: 15px;
  margin: 25px 0px;
  width: 290px;
  font-size: 15px;
  background: #ffeb9c;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #E99F4C;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }
`;

const Link = styled.a`
  font-weight: 800;
  color: #454a68;
  padding: 10px;
  text-decoration: none;
  margin-bottom: 20px;
  display:inline-block;
`

const DivGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivLine = styled.div`
  width: 100px;
  height: 0;
  border: 1px solid #444444;
`;

const Divider = styled.div`
  font-weight: 800;
  color: #454a68;
  text-decoration: none;
`;

const AdditionalLinks = styled.p`
  margin: 0px;
  margin-bottom: 15px;
  padding: 0px;
`

const LinkStyle = {
  padding: 0,
  margin: "0px"
};

interface FormState {
  email: string;
  password: string;
}

interface ResponseData {
  email?: string;
  userid?: string;
  error?: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState<FormState>({ email: '', password: '' });
  const [error, setError] = useState<string>('');

  // Handling change in form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  // Handling form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/v1/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state)
    });

    const data: ResponseData = await res.json();
    if (res.ok) {
      // Here you can handle the successful login, e.g., storing user data
      // Redirecting to the profile or home page
      router.push(`/profile/${data.userid}`);
    } else {
      // Handling errors
      setError(data.error || 'An unknown error occurred');
    }
  };

  useEffect(() => {
    //document.getElementById('userid')?.focus();
  }, []);

  return (
      <Container>
        <BackgroundWrapper>
          <ApplicationBackground />
        </BackgroundWrapper>
        <FormArea>
          <Title>LOGIN</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <SubTitle htmlFor="email">Email</SubTitle>
              <FormInput
                  name="email"
                  placeholder="Enter your Vanderbilt email"
                  type="text"
                  value={state.email}
                  onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="password">Password</SubTitle>
              <FormInput
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
              />
            </FormGroup>
            <LoginButton type="submit">LOGIN</LoginButton>
            <DivGroup >
              <DivLine></DivLine>
              <Divider>OR</Divider>
              <DivLine></DivLine>
            </DivGroup>
            <GoogleSignInButton />
            <AdditionalLinks>Don't Have an Account? <Link href="/googleVerify" style={LinkStyle}>Create New Account</Link></AdditionalLinks>
            <AdditionalLinks>Forget Password? <Link href="/passwordForget" style={LinkStyle}>Reset Password</Link></AdditionalLinks>
          </form>
        </FormArea>
      </Container>
  );
};

export default Login;
