import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

import PostSide from "../components/posts/postSide";
import ProfileCard from "../components/profile/ProfileCard";
import InfoCard from "../components/users/InfoCard";
import LogoSearch from "../components/logoSearch/LogoSearch";
import FollowersCard from "../components/profile/FollowersCard";
import { fetchTimelinePost, fetchUserPost, getUserById, getUsers } from "../api/api";
import { addAllUser, addLoggedUser, userPosts, userTimelinePosts } from "../components/users/usersSlice";
import InfoSide from "../components/infoSide/InfoSide";

const Home = () => {
  const user = useSelector((state) => state.loggedUser.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    // Get the initial user from local storage
    const initialUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (!initialUser) {
      navigate("/auth");
    } else {
      getUserById(initialUser.user._id).then((data) => {
        dispatch(addLoggedUser(data.payload));
      });
      fetchTimelinePost(initialUser.user._id)
        .then((res) => {
          dispatch(userTimelinePosts(res.payload));
        })
        .then(() => {
          return getUsers();
        })
        .then((data) => {
          const users = data.payload.filter(
            (el) => el._id !== initialUser.user._id
          );
          dispatch(addAllUser(users));
        })
        .then(() => {
          fetchUserPost(initialUser.user._id)
            .then((post) => {
              dispatch(userPosts(post.payload));
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, [dispatch, navigate]);

  return (
    <div className="container-fluid">
      <>
        {user ? (
          <div className="row py-2">
            <div className="col-lg-3 col-12 d-flex flex-column gap-4">
              <LogoSearch />
              <InfoCard />
              <FollowersCard />
            </div>
            <div className="col-12 col-lg-6 d-flex flex-column gap-4">
              <ProfileCard />
              <PostSide />
            </div>
            <div className="col-12 col-lg-3">
            <InfoSide />
            </div>
          </div>
        ) : (
          <div className="position-relative" style={{ height: "75vh" }}>
            <Link style={{ textDecoration: "none" }} to="/auth">
              <h3 className="position-absolute top-50">
                Please log in or Sign up <BiLogIn />
              </h3>
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
