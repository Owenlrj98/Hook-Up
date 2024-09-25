import { useEffect, useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";

//components
import AdminLocationList from "../components/AdminLocationList";

const AdminLocationPage = ({ locations, setLocations, adminToken }) => {
  return (
    <div>
        <AdminLocationList
          adminToken={adminToken}
          locations={locations}
          setLocations={setLocations}
        />
    </div>
  );
};

export default AdminLocationPage;
