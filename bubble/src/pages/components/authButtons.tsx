"use client";

import Image from "next/image";
import googleLogo from "public/google.png";
import { signIn } from "next-auth/react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  margin: 25px 0px;
  width: 290px;
  font-size: 15px;
  background: #FFFFFF;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #E99F4C;
  cursor: pointer;
  &:hover {
    opacity: .75;
  }
`;

export function GoogleSignInButton() {
    const handleClick = () => {
        signIn(
            "google",
            { callbackUrl: '/register' }
        );
        // alert("I will redirect you to /home");
    };

    return (
        <Button onClick={handleClick}>
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">Sign in with Google</span>
        </Button>
    );
}


export function GoogleSignUpButton() {
    const handleClick = () => {
        signIn(
            "google",
            { callbackUrl: '/register' }
        );
        // alert("I will redirect you to /home");
    };

    return (
        <Button onClick={handleClick}>
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">Sign up with Google</span>
        </Button>
    );
}


// Github sign in not need right now
/**export function GithubSignInButton() {
    const handleClick = () => {
        signIn("github");
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
            <span className="ml-4">Continue with Github</span>
        </button>
    );
}**/

export function CredentialsSignInButton() {
    const handleClick = () => {
        signIn();
    };

    return (
        <button
            onClick={handleClick}
            className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
        >
            {/* <Image src={githubLogo} alt="Github Logo" width={20} height={20} /> */}
            <span className="ml-4">Continue with Email</span>
        </button>
    );
}