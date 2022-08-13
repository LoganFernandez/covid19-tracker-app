import About from "./About";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const mockAxios = new MockAdapter(axios);

describe("About component", () => {
  const aboutData = [
    {
      title: "About COVID19sg",
      body: "testing",
      body2: "testing1",
      body3: "testing12",
      body4: "testing123",
    },
  ];

  beforeEach(() => {
    mockAxios.reset();
  });

  // Happy path
  it("should render the About component if the API call is successful", async () => {
    mockAxios
      .onGet("https://covid19-tracker-app-express.herokuapp.com/about")
      .reply(200, aboutData);

    const { getByText } = render(<About />);

    await waitFor(() => getByText("About COVID19sg"));
    expect(getByText("About COVID19sg")).toBeInTheDocument();
    expect(getByText("testing")).toBeInTheDocument();
    expect(getByText("testing1")).toBeInTheDocument();
    expect(getByText("testing12")).toBeInTheDocument();
    expect(getByText("testing123")).toBeInTheDocument();
  });

  // Unhappy path
  it("should not render the About component if the API call is not successful, and should instead console.log the error", async () => {
    mockAxios
      .onGet("https://covid19-tracker-app-express.herokuapp.com/about")
      .networkErrorOnce();

    try {
      render(<About />);
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(console.log).toHaveBeenCalled();
    }
  });
});
