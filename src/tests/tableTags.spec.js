const { render } = require("@testing-library/react");
import TableTags from "../components/tableTags";
import "@testing-library/jest-dom";

const tableTestData = {
  result: [
    { tag: "</div>", count: 8 },
    { tag: "</p>", count: 7 },
  ],
  url: "https://example.com",
};

const renderComponent = () => {
  const renderResult = render(
    <TableTags result={tableTestData.result} url={tableTestData.url} />
  );
  return renderResult;
};

describe("headerTableTags", () => {
  it("should render correctly header table tags", () => {
    const { getByText } = renderComponent();

    expect(getByText("Resultados Para:")).toBeInTheDocument();
  });
});

describe("urlTableTags", () => {
  it("should render correctly url table tags", () => {
    const { getByText } = renderComponent();

    expect(getByText("https://example.com")).toBeInTheDocument();
  });
});

describe("BodyTableTags", () => {
  it("should render correctly body Table tags", () => {
    const { getByText } = renderComponent();

    expect(getByText("Tag")).toBeInTheDocument();
    expect(getByText("Quantidade")).toBeInTheDocument();
    expect(getByText("div")).toBeInTheDocument();
    expect(getByText("p")).toBeInTheDocument();
  });
});
