import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProjectForm from "./ProjectForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("ProjectForm", () => {
  it("renders the form correctly", () => {
    render(<ProjectForm />);
    
    // Test form elements
    expect(screen.getByText("Create Project")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Project Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Thumbnail URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload Images")).toBeInTheDocument();
    expect(screen.getByLabelText("Target Amount")).toBeInTheDocument();
    expect(screen.getByText("Create Project")).toBeInTheDocument();
  });

  it("handles form submission", async () => {
    render(<ProjectForm />);
    
    // Mock axios.post to resolve with a successful response
    jest.spyOn(require("axios"), "post").mockResolvedValue({
      status: 200,
      data: {},
    });

    // Fill out form fields
    fireEvent.change(screen.getByLabelText("Project Name"), {
      target: { value: "Test Project" },
    });
    fireEvent.change(screen.getByLabelText("Project Description"), {
      target: { value: "Description" },
    });
    fireEvent.change(screen.getByLabelText("Thumbnail URL"), {
      target: { value: "http://example.com/image.jpg" },
    });
    fireEvent.change(screen.getByLabelText("Target Amount"), {
      target: { value: "1000" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Create Project"));

    // Wait for the API call to resolve
    await screen.findByText("API Response: Success");

    // Verify that the API call was made
    expect(require("axios").post).toHaveBeenCalledWith(
      expect.stringContaining("/api/create-project"),
      expect.objectContaining({
        projectName: "Test Project",
        // Include other fields as needed
      })
    );
  });
});
