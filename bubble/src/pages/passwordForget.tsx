import React, {useState, FormEvent, FC, useEffect} from 'react';
import styled from 'styled-components';
import {router} from "next/client";
import {useRouter} from "next/router";
import {GoogleSignInButton} from "@/pages/components/authButtons";


// Styled components
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
`;

const FormArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #EDDCD9;
  height: auto;
  width: 450px;
  border: 2px solid #264143;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #E99F4C;
`;

const FormInput = styled.input`
  outline: none;
  border: 2px solid #264143;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  width: 290px;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
`;

const Title = styled.p`
  color: #264143;
  font-weight: 900;
  font-size: 1.5em;
  margin-top: 20px;
`;

const SubTitle = styled.label`
  font-weight: 600;
  margin: 10px 0;
`;

const SendEmailButton = styled.button`
  padding: 15px;
  margin: 25px 0px;
  width: 290px;
  font-size: 15px;
  background: #DE5499;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #E99F4C;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }
`;

export const ResetPasswordP1 = (): JSX.Element => {
    // set states for email
    const [email, setEmail] = useState("");

    const handleEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
      setEmail(event.currentTarget.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("email", email);

      console.log("form data:", formData);
      console.log(`Try to send email to ${email}...`);
      
      // send an email with link to reset page
      const response = await fetch(
        '/api/sendEmail',
        {
            method: 'post',
            body: formData
        }
      );
      
      console.log("response", response);
    }

    return (
        <Container>
            <FormArea>
              <form onSubmit={handleSubmit}>
                  <Title>Reset Password</Title>
                  <SubTitle>Please Enter your Vanderbilt email below</SubTitle>
                  <FormInput type="text" value={email} onChange={handleEmailChange} placeholder="Enter your Vanderbilt email" />
                  <SendEmailButton type="submit">Send Email</SendEmailButton>
              </form>
            </FormArea>
        </Container>
    );
};

export default ResetPasswordP1;
