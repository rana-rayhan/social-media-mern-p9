import React from "react";
import LogoSearch from "../logoSearch/LogoSearch";
import ProfileCard from "./ProfileCard";
import FollowersCard from "./FollowersCard";

const ProfileSide = () => {
  return (
    <div className="d-flex flex-column gap-4 overflow-auto">
      <LogoSearch />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
