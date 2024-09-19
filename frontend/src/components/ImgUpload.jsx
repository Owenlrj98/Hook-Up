import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("profilePicture", file);
    
        try {
            const response = await fetch("http://localhost:3000/api/user/profile/upload", {
                method: "POST",
                body: formData,
                headers: {}
            })
        }}
}