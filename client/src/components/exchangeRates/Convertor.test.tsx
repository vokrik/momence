import userEvent from "@testing-library/user-event";
import React from "react";
import { act, render, screen, within } from "@testing-library/react";
import { Convertor } from "./Convertor";

describe("Convertor", () => {
  it("should render when at least 1 rate is available", () => {
    render(
      <Convertor
        rates={[
          {
            country: "United States",
            currency: "US Dollar",
            code: "USD",
            amount: 1,
            rate: 21.886,
          },
        ]}
      />,
    );
    expect(screen.getByTestId("convertor")).toBeInTheDocument();
    expect(
      within(screen.getByTestId("convertor-result")).getByText("0,00 US$"),
    ).toBeTruthy(); // 100 / 21.886 = 4.56913095129
  });
  it("does not render when no rates are provided", () => {
    render(<Convertor rates={[]} />);
    expect(screen.queryByTestId("convertor")).not.toBeInTheDocument();
  });

  it("converts by selected rate and rounds up to 2 digits", () => {
    render(
      <Convertor
        rates={[
          {
            country: "United States",
            currency: "US Dollar",
            code: "USD",
            amount: 1,
            rate: 21.886,
          },
        ]}
      />,
    );

    const input = screen.getByRole("textbox", {
      name: /convert/i,
    });

    act(() => {
      userEvent.type(input, "100");
    });

    const result = screen.getByTestId("convertor-result");
    expect(within(result).getByText("4,57 US$")).toBeTruthy(); // 100 / 21.886 = 4.56913095129
  });

  it("splits currencies by popularity", () => {
    render(
      <Convertor
        rates={[
          {
            country: "United States",
            currency: "US Dollar",
            code: "USD",
            amount: 1,
            rate: 21.886,
          },
          {
            country: "Croatia",
            currency: "Kuna",
            code: "HRK",
            amount: 1,
            rate: 12.3,
          },
        ]}
      />,
    );

    const select = screen.getByTestId("currency-select");

    expect(
      within(select).getByTestId("currency-popular-USD"),
    ).toBeInTheDocument();
    expect(
      within(select).getByTestId("currency-other-HRK"),
    ).toBeInTheDocument();
  });

  it("Allows user to change currencies", () => {
    render(
      <Convertor
        rates={[
          {
            country: "United States",
            currency: "US Dollar",
            code: "USD",
            amount: 1,
            rate: 21.886,
          },
          {
            country: "Croatia",
            currency: "Kuna",
            code: "HRK",
            amount: 1,
            rate: 12.3,
          },
        ]}
      />,
    );

    const input = screen.getByRole("textbox", {
      name: /convert/i,
    });
    act(() => {
      userEvent.type(input, "100");
    });

    const result = screen.getByTestId("convertor-result");
    expect(within(result).getByText("4,57 US$")).toBeTruthy(); // 100 / 21.886 = 4.56913095129

    const select = within(screen.getByTestId("currency-select")).getByRole(
      "combobox",
    );

    expect(
      within(select).getByTestId("currency-popular-USD"),
    ).toBeInTheDocument();
    act(() => {
      userEvent.selectOptions(select, "HRK");
    });

    expect(
      (screen.getByRole("option", { name: "HRK" }) as HTMLOptionElement)
        .selected,
    ).toBe(true);

    expect(within(result).getByText("8,13 HRK")).toBeTruthy(); // 100 / 12.3 = 8.13008130081
  });
});
