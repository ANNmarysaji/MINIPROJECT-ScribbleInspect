import { useState } from "react";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((store) => store.user);

  const [userData, setUserData] = useState({
    userName: user?.name || "",
    email: user?.email || "",
    userType: user?.user_type || "",
  });

  const { userName, email, userType } = userData;

  return (
    <Wrapper>
      <div className="form">
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow type="name" name="name" value={userName} disabled={true} />
          <FormRow type="email" name="email" value={email} disabled={true} />
          <FormRow type="user" name="user" value={userType} disabled={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
