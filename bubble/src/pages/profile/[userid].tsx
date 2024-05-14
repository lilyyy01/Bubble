import React, {useState, useEffect, FC, Dispatch, SetStateAction} from 'react';
import styled from 'styled-components';
import {useParams} from "next/navigation";
import {Header} from "../components/navBar"
import {useRouter} from "next/router";

const AsymmetricContainer = styled.div`
  display: flex;
  border: 2px solid #454a68;
`;

const MainContent = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #e4e4e7;
  //border: 2px solid #454a68;
  position: relative;
`;

const Sidebar = styled.div`
  flex: 1.5;
  padding: 20px;
  background-color: #e4e4e7;
  //border: 2px solid #454a68;
`;

const FormArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecefff;
  height: auto;
  width: 80%;
  border: 2px solid #454a68;
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #7c84e5;
  padding: 20px;
`;

const ProfileAndTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //width: 100%; // Adjust width as needed
  margin-top: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 25px;
`;

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  align-self: flex-start;
`;

const ProfileContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  width: 200%;
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
  margin: 5px 0;
  word-wrap: break-word;
`;

const EditButton = styled.button`
  padding: 7px;
  margin-top: 7px;
  width: 100px;
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

export interface ProfileState {
    email: string;
    first_name: string;
    last_name: string;
    pronouns: string;
    community: string;
    graduation_year: string;
    bio: string;
    interests: string;
    industry: string;
    job: string;
    grad_school: string;
    hometown: string;
    phone_number: string;
    social_media: string;
    is_private: Boolean;
}


const Profile: React.FC = () => {
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

    const onClick = () => {
        router.push(`/profile/edit-profile/${userid}`);
    };

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

    return (
        <>
            <Header/>
            <AsymmetricContainer>
                <MainContent>
                    <FormArea>
                        <ProfileAndTitleContainer>
                            <ProfileImageWrapper>
                                <ProfileImage src="/IMG_9773.png" alt={state.first_name} />
                            </ProfileImageWrapper>
                            <ProfileContainer>
                                <Title>{state.first_name} {state.last_name}</Title>
                                <SubTitle>({state.pronouns})</SubTitle>
                                <SubTitle>Vanderbilt University - Class of {state.graduation_year}</SubTitle>
                                <SubTitle>{state.community}</SubTitle>
                                <EditButton onClick={onClick}>Edit Profile</EditButton>
                            </ProfileContainer>
                        </ProfileAndTitleContainer>
                        <BioContainer>
                            {state.bio && (
                                <FormGroup>
                                    <SubTitle>Bio</SubTitle>
                                    <ProfileDetails>{state.bio}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.interests && (
                                <FormGroup>
                                    <SubTitle>Interests</SubTitle>
                                    <ProfileDetails>{state.interests}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.industry && (
                                <FormGroup>
                                    <SubTitle>Industry</SubTitle>
                                    <ProfileDetails>{state.industry}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.job && (
                                <FormGroup>
                                    <SubTitle>Job/Company</SubTitle>
                                    <ProfileDetails>{state.job}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.grad_school && (
                                <FormGroup>
                                    <SubTitle>Graduate School</SubTitle>
                                    <ProfileDetails>{state.grad_school}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.hometown && (
                                <FormGroup>
                                    <SubTitle>Hometown</SubTitle>
                                    <ProfileDetails>{state.hometown}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.phone_number && (
                                <FormGroup>
                                    <SubTitle>Phone Number</SubTitle>
                                    <ProfileDetails>{state.phone_number}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.email && (
                                <FormGroup>
                                    <SubTitle>Email</SubTitle>
                                    <ProfileDetails>{state.email}</ProfileDetails>
                                </FormGroup>
                            )}
                            {state.social_media && (
                                <FormGroup>
                                    <SubTitle>Social Media</SubTitle>
                                    <ProfileDetails>{state.social_media}</ProfileDetails>
                                </FormGroup>
                            )}
                        </BioContainer>
                    </FormArea>
                </MainContent>
                <Sidebar>
                </Sidebar>
            </AsymmetricContainer>
        </>
    );
};

export default Profile;