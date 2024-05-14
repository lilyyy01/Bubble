import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Header} from "../../components/navBar"
import {useRouter} from "next/router";
import {ProfileState} from "@/pages/profile/[userid]";

const GridContainerA = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  padding: 20px;
  background-color: #e4e4e7;
`;

const GridContainerB = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 40px;
  background-color: #e4e4e7;
`;

const TopGridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecefff;
  height: auto;
  width: 95%;
  border: 2px solid #454a68;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  padding: 20px;
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecefff;
  height: auto;
  width: 90%;
  border: 2px solid #454a68;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  padding: 20px;
  //text-align: center;
`;

const ProfileAndTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110%;
`;

const ProfileImageWrapper = styled.div`
  grid-area: pic;
  padding: 1em;
  background-color: #FFFFFF;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  max-width: 150px;
  max-height: 150px;
  @media (min-width: 500px) {
    max-width: 200px;
    max-height: 200px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  object-fit: cover;
`;

const ProfileContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const SubTitle = styled.div`
  font-weight: 600;
  align-self: flex-start;
`;

const BioTitle = styled.div`
  font-weight: 600;
  align-self: flex-start;
  margin-left: 125px;
`;

const SaveButton = styled.button`
  padding: 7px;
  width: 110px;
  font-size: 12px;
  background: #898ca5;
  color: #ffffff;
  text-shadow: -1px -1px 0 #454a68, 1px -1px 0 #454a68, -1px  1px 0 #454a68, 1px  1px 0 #454a68;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #7c84e5;
  cursor: pointer;
  align-self: flex-end;
  &:hover {
    opacity: .75;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ProfileDetails = styled.div`
  outline: none;
  background: #FFFFFF;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  width: 100%;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
  word-wrap: break-word;
`;

const FormInput = styled.input`
  outline: none;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  width: 100%;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
  word-wrap: break-word;
`;

const BioInput = styled.input`
  outline: none;
  border: 2px solid #454a68;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  width: 80%;
  padding: 12px 10px;
  border-radius: 4px;
  font-size: 15px;
`;

const EditProfile: React.FC = () => {
    const router = useRouter();
    const { userid } = router.query;
    const [state, setState] = useState<ProfileState>({
        first_name: "",
        last_name: "",
        email: "",
        community: "",
        graduation_year: "",
        pronouns: "",
        bio: "",
        interests: "",
        industry: "",
        job: "",
        grad_school: "",
        hometown: "",
        phone_number: "",
        social_media: "",
        is_private: false,
    });

    const fetchUser = async () => {
        if (!userid) return;

        try {
            const res = await fetch(`/api/v1/user/?userid=${userid}`, {
                method: "GET"
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user data');
            }
            const { data } = await res.json();

            setState({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                community: data.community,
                graduation_year: data.graduation_year.toString(),
                pronouns: data.pronouns,
                bio: data.bio,
                interests: data.interests,
                industry: data.industry,
                job: data.job,
                grad_school: data.grad_school,
                hometown: data.hometown,
                phone_number: data.phone_number,
                social_media: data.social_media,
                is_private: data.is_private,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (userid) {
            fetchUser();
        }
    }, [userid]);

    // Update state on input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onSave = async () => {
        if (!userid) return;

        try {
            const res = await fetch(`/api/v1/user/?userid=${userid}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: state }),
            });

            if (!res.ok) {
                throw new Error('Failed to save user data');
            }

            router.push(`/profile/${userid}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
        <Header/>
            <GridContainerA>
                <TopGridItem>
                    <ProfileAndTitleContainer>
                        <ProfileImageWrapper>
                            <ProfileImage src="/IMG_9773.png" alt={state.first_name} />
                        </ProfileImageWrapper>
                        <ProfileContainer>
                            <Title>{state.first_name} {state.last_name} ({state.pronouns})</Title>
                            <SubTitle>Vanderbilt University - Class of {state.graduation_year}</SubTitle>
                            <SubTitle>{state.community}</SubTitle>
                            <SaveButton onClick={onSave}>Save Changes</SaveButton>
                        </ProfileContainer>
                    </ProfileAndTitleContainer>
                    <FormGroup>
                        <BioTitle>Bio (optional)</BioTitle>
                        <BioInput
                            name="bio"
                            value={state.bio || ''}
                            placeholder="Vanderbilt University Alumni"
                            type="text"
                            onChange={handleChange}
                        />
                    </FormGroup>
                </TopGridItem>
            </GridContainerA>
        <GridContainerB>
            <GridItem>
                <FormGroup>
                    <SubTitle>Vanderbilt Email</SubTitle>
                    <ProfileDetails>{state.email}</ProfileDetails>
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Interests (optional)</SubTitle>
                    <FormInput
                        name="interests"
                        value={state.interests || ''}
                        placeholder="Share your interests with your community."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Industry (optional)</SubTitle>
                    <FormInput
                        name="industry"
                        value={state.industry || ''}
                        placeholder="Share the industry you work in."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Job/Company (optional)</SubTitle>
                    <FormInput
                        name="job"
                        value={state.job || ''}
                        placeholder="Share what job you have or where you work."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Graduate School (optional)</SubTitle>
                    <FormInput
                        name="grad_school"
                        value={state.grad_school || ''}
                        placeholder="Share any graduate school experience you have."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Hometown (optional)</SubTitle>
                    <FormInput
                        name="hometown"
                        value={state.hometown || ''}
                        placeholder="Share your hometown with your community."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Phone Number (optional)</SubTitle>
                    <FormInput
                        name="phone_number"
                        value={state.phone_number || ''}
                        placeholder="Share your phone number to build connections."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
            <GridItem>
                <FormGroup>
                    <SubTitle>Social Media (optional)</SubTitle>
                    <FormInput
                        name="social_media"
                        value={state.social_media || ''}
                        placeholder="Share your social media accounts so people can get to know you better."
                        type="text"
                        onChange={handleChange}
                    />
                </FormGroup>
            </GridItem>
        </GridContainerB>
            </>
    );
};

export default EditProfile;