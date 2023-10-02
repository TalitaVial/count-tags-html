import { render, screen } from "@testing-library/react";
import HtmlAnalyzer from "../pages/htmlAnalyzer";
import styles from "../styles/htmlAnalyzer.module.css";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const mockState = jest.fn();
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: (initialState) => [initialState, mockState],
}));

const renderComponent = () => {
  const resultRender = render(<HtmlAnalyzer />);
  return resultRender;
};

//o query não deixa falhar caso não encontre o elemento
//o getBY busca por unico elemento
//o getAll busca por todos que satisfação a busca
//o find ele espera o elemento aparecer

describe("headerHtmlAnalyzer", () => {
  it("Should render correctly header page html Analyzer", () => {
    const { container } = renderComponent();

    const h1Element = container.querySelector(`.${styles.title}`);
    expect(h1Element).toBeInTheDocument();
    expect(h1Element).toHaveTextContent("Analisar página");

    const spanElement = h1Element.querySelector(`.${styles.textHtml}`);
    expect(spanElement).toBeInTheDocument();
    expect(spanElement).toHaveTextContent("HTML");
  });
});

describe("renderTextWelcome", () => {
  it("should render correctly text welcome html analyzer", () => {
    
    const { getByText } = renderComponent();

    const welcomeText = getByText(
      "Seja Bem Vindo!!Você está no programa de contagem de Tags HTML. Você pode começar agora mesmo a verificar sua primeira página HTML."
    );

    expect(welcomeText).toBeInTheDocument();
  });
});

describe("formHtmlAnalyzer", () => {
  it("should input correctly url analyze", () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(
      getByText("Informe as urls separadas por vírgula:")
    ).toBeInTheDocument();
    expect(getByText("Analisar")).toBeInTheDocument();
    expect(getByPlaceholderText("Digite a URL")).toBeInTheDocument();
  });
});

describe("InputFormHtmlAnalyzer", () => {
  it("should render correctly the content input form html analyzer", () => {
    const { debug } = renderComponent();
    debug();
    const input = screen.getByPlaceholderText("Digite a URL");
    userEvent.clear(input);
    userEvent.type(input, "https://example.com");
    debug();
  });
});

describe("footerHtmlAnalyzer", () => {
  it("should render correctly link for gitHub in html Analyzer", () => {
    const { getByRole, getByText } = renderComponent();

    const link = getByRole("link");
    expect(getByText("©2023 Talita Vial"))
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("GitHub");
  });
});
