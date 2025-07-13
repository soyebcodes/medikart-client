import { Helmet } from "react-helmet-async";
import UserPaymentHistory from "../../PaymentHistory/UserPaymentHistory";

const UserHome = () => {
  return (
    <div>
      <Helmet>
        <title>User Dashboard | MediKart</title>
      </Helmet>
      <UserPaymentHistory />
    </div>
  );
};

export default UserHome;
