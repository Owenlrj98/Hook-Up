import { useEffect, useState } from "react";

//components
import AdminLocationList from "../components/AdminLocationList";

const AdminLocationPage = ({ adminToken }) => {
    return (
        <AdminLocationList token={adminToken} />
  );
};

export default AdminLocationPage;
