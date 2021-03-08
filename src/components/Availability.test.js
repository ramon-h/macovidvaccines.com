import { act, render, screen } from "@testing-library/react";

import Availability from "./Availability";

it("shows dates and slot numbers", async () => {
    await act(async () => {
        render(
            <Availability
                entry={{
                    hasAppointments: true,
                    appointmentData: {
                        "10/11/2021": {
                            hasAvailability: true,
                            numberAvailableAppointments: 35,
                        },
                    },
                }}
            />
        );
    });
    expect(screen.queryByText("10/11/2021: 35 slots")).toBeTruthy();
});

it("shows total slots if slots by date aren't available", async () => {
    await act(async () => {
        render(
            <Availability
                entry={{
                    hasAppointments: true,
                    totalAvailability: 45,
                }}
            />
        );
    });
    expect(screen.queryByText("45 slots")).toBeTruthy();
});

it("shows total slots if availability has no content", async () => {
    await act(async () => {
        render(
            <Availability
                entry={{
                    hasAppointments: true,
                    totalAvailability: 45,
                    availability: {},
                }}
            />
        );
    });
    expect(screen.queryByText("45 slots")).toBeTruthy();
});

it("shows total slots across all available days", async () => {
    await act(async () => {
        render(
            <Availability
                entry={{
                    hasAppointments: true,
                    appointmentData: {
                        "10/11/2021": {
                            hasAvailability: true,
                            numberAvailableAppointments: 35,
                        },
                        "10/12/2021": {
                            hasAvailability: true,
                            numberAvailableAppointments: 35,
                        },
                    },
                }}
            />
        );
    });
    expect(screen.getByText("Total available: 70 slots")).toBeVisible();
});

it("does not show total slots across all available days if there aren't any", async () => {
    await act(async () => {
        render(
            <Availability
                entry={{
                    hasAppointments: false,
                    totalAvailability: 0,
                }}
            />
        );
    });
    expect(() => {
        screen.getByText("Total available");
    }).toThrow();
});
