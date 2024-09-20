src/Profile.js
import { useEffect, useState } from 'react';

const Profile = () => {
    const [formData, setFormData] = useState({
        profilePic: "",
        Name: "",
        Experience: "",
        Preferences: []
    });
    // const [user, setUser] = useState({
    //     name: '',
    //     experience: '',
    //     preferences: []
    // });
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await
        }
        }
      };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
            <select name="experienceLevel" value={formData.experience} onChange={handleChange}>
                <option value="">Select Experience Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
            </select>
            <input type="text" name="preferences" value={formData.preferences.join(', ')} onChange={(e) => setUser({ ...user, preferences: e.target.value.split(', ') })} placeholder="Preferences (comma separated)" />
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default Profile;
