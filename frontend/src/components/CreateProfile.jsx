export default function createProfile() {
  return (
    <div className="pages-box-shadow p-3 mt-3">
      <h5 className="h3-custom">Create Profile</h5>
      <Form onSubmit={handleSubmit} className="formLabel mt-2 p-3">
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExperience" className="mt-3">
          <Form.Label>Your Experience Level </Form.Label>
          <Form.Control
            type="text"
            name="experience"
            placeholder="Enter your experience level"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPreferences" className="mt-3">
          <Form.Label>Likes</Form.Label>
          <Form.Control
            type="text"
            name="preferences"
            placeholder="Enter your preferences"
            value={formData.preferences}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <div className="button-container mt-3">
          <Button type="submit" className="custom-button-primary">
            Create
          </Button>
          {errorMessage && <p className="error mt-3">{errorMessage}</p>}
          {successMessage && <p className="success mt-3">{successMessage}</p>}
        </div>
      </Form>
    </div>
  );
}
