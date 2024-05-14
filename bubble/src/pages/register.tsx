import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import {useRouter} from "next/router";
import {mutate} from "swr";
import ApplicationBackground from "@/pages/components/applicationBackground";
import mongoose from "mongoose";

// Styled components
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  min-height: 100vh;
  width: 100vw;
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  z-index: -1;
`;

const FormArea = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
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
  width: 310px;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
`;

const FormSelect = styled.select`
  outline: none;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #E99F4C;
  width: 310px;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
  background-color: white;
  color: #6e6e6e; // Default text color for all options
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:invalid {
    color: grey;
  }

  option {
    color: black; // Text color for options
  }

  option[value=""][disabled] {
    color: grey;
  }
`;

const RegisterButton = styled.button`
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
  padding: 5px;
  text-decoration: none;
`;

// Form select arrays
const gradYearOptions = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() + i);
const pronounsOptions = ['She/her', 'He/him', 'They/them'];
const locationOptions = [
    'Nashville, TN',
  'New York City, NY',
  'San Francisco, CA',
  'Chicago, IL'];

// TypeScript types for the form state
interface FormState {
  first_name: string;
  last_name: string;
  pronouns: string;
  email: string;
  graduation_year: string;
  community: string;
  password: string;
  is_private: boolean;
}


 
export const Register = (): JSX.Element => {
  const router = useRouter();
  const [state, setState] = useState<FormState>({
    first_name: "",
    last_name: "",
    pronouns: "",
    email: "",
    graduation_year: "",
    community: "",
    password: "",
    is_private: true
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* validate form can be done like this later
    const errs = formValidate(); add this function too */
    registerUser(state);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    
    if (name !== 'confirmPassword'){
      setState({
        ...state,
        [name]: value,
      });
    }

  };

  const registerUser = async (form: FormState) => {
    try {
      const res = await fetch (`/api/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
          throw (res.status.toString());
      }
      const {data} = await res.json();
      mutate(`/api/v1/user`, data, false);

      try {
        const res = await fetch (`/api/v1/member`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: data,
        });

        if (!res.ok) {
          throw (res.status.toString());
        }

        const {member} = await res.json();
        // Need to add some code to save the (member.id) to session data... this way, we can have easy access to each user's community info

        router.push(`/profile/${data.userid}`);

      } catch(error) {
        console.log("Failed to add new member to community.");
      }

    } catch(error) {
      console.log("Failed to register user.");
    }
  };

  return (
      <Container>
        <BackgroundWrapper>
          <ApplicationBackground />
        </BackgroundWrapper>
        <FormArea>
          <Title>REGISTER</Title>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <SubTitle htmlFor="first_name">First Name</SubTitle>
              <FormInput
                  name="first_name"
                  placeholder="Enter your first name"
                  type="text"
                  value={state.first_name}
                  onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="last_name">Last Name</SubTitle>
              <FormInput
                  name="last_name"
                  placeholder="Enter your last name"
                  type="text"
                  value={state.last_name}
                  onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="graduation_year">Pronouns</SubTitle>
              <FormSelect
                  name="pronouns"
                  value={state.pronouns}
                  onChange={handleChange}
                  required
              >
                <option value="" disabled>Select your pronouns</option>
                {pronounsOptions.map(pronoun => (
                    <option key={pronoun} value={pronoun}>{pronoun}</option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="email">Vanderbilt Email</SubTitle>
              <FormInput
                  name="email"
                  placeholder="Enter your Vanderbilt email"
                  type="email"
                  value={state.email}
                  onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="graduation_year">Graduation Year</SubTitle>
              <FormSelect
                  name="graduation_year"
                  value={state.graduation_year}
                  onChange={handleChange}
                  required
              >
                <option value="" disabled>Select your graduation year</option>
                {gradYearOptions.map(year => (
                    <option key={year} value={year}>{year}</option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="community">Post-Grad Location</SubTitle>
              <FormSelect
                  name="community"
                  value={state.community}
                  onChange={handleChange}
                  required
              >
                <option value="" disabled>Select your post-grad location of residence</option>
                {locationOptions.map(location => (
                    <option key={location} value={location}>{location}</option>
                ))}
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <SubTitle htmlFor="email">Password</SubTitle>
              <FormInput
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
              />
            </FormGroup>
            <RegisterButton type="submit">REGISTER</RegisterButton>
            <p>Already Have an Account? <Link href="/login">Login Here</Link></p>
          </form>
        </FormArea>
      </Container>
  );
};

export default Register;