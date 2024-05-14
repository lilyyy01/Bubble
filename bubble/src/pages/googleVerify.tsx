import React, {useState, FormEvent, FC, useEffect} from 'react';
import styled from 'styled-components';
import {router} from "next/client";
import {useRouter} from "next/router";
import {GoogleSignInButton} from "@/pages/components/authButtons";
import ApplicationBackground from "@/pages/components/applicationBackground";

const Container = styled.div`
  position: relative; // Establish a stacking context
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 100vh; // Full viewport height
  width: 100vw; // Full viewport width
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

export const GoogleVerify = (): JSX.Element => {
    return (
        <Container>
            <BackgroundWrapper>
                <ApplicationBackground />
            </BackgroundWrapper>
            <FormArea>
                <Title>Google Verification</Title>
                <SubTitle>Please verify your Vanderbilt email below</SubTitle>
                <GoogleSignInButton />
            </FormArea>
        </Container>
    );
};

export default GoogleVerify;