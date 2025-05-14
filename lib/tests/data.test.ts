import { describe, it, expect } from "vitest";
import type { User } from "../types";
import { transformUserData } from "../data";

describe("transformUserData", () => {
  it("should correctly transform user data grouped by department", () => {
    // Mock user data
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        age: 30,
        gender: "male",
        hair: { color: "Black", type: "Strands" },
        address: {
          postalCode: "12345",
          address: "",
          city: "",
          coordinates: { lat: 0, lng: 0 },
          state: "",
        },
        company: {
          department: "Engineering",
          name: "",
          title: "",
          address: {
            address: "",
            city: "",
            coordinates: { lat: 0, lng: 0 },
            postalCode: "",
            state: "",
          },
        },
        email: "",
        phone: "",
        username: "",
        password: "",
        birthDate: "",
        image: "",
        bloodGroup: "",
        height: 0,
        weight: 0,
        eyeColor: "",
        domain: "",
        ip: "",
        macAddress: "",
        university: "",
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        ein: "",
        ssn: "",
        userAgent: "",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        age: 25,
        gender: "female",
        hair: { color: "Brown", type: "Curly" },
        address: {
          postalCode: "67890",
          address: "",
          city: "",
          coordinates: { lat: 0, lng: 0 },
          state: "",
        },
        company: {
          department: "Engineering",
          name: "",
          title: "",
          address: {
            address: "",
            city: "",
            coordinates: { lat: 0, lng: 0 },
            postalCode: "",
            state: "",
          },
        },
        email: "",
        phone: "",
        username: "",
        password: "",
        birthDate: "",
        image: "",
        bloodGroup: "",
        height: 0,
        weight: 0,
        eyeColor: "",
        domain: "",
        ip: "",
        macAddress: "",
        university: "",
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        ein: "",
        ssn: "",
        userAgent: "",
      },
      {
        id: 3,
        firstName: "Bob",
        lastName: "Johnson",
        age: 40,
        gender: "male",
        hair: { color: "Blond", type: "Straight" },
        address: {
          postalCode: "54321",
          address: "",
          city: "",
          coordinates: { lat: 0, lng: 0 },
          state: "",
        },
        company: {
          department: "Marketing",
          name: "",
          title: "",
          address: {
            address: "",
            city: "",
            coordinates: { lat: 0, lng: 0 },
            postalCode: "",
            state: "",
          },
        },
        email: "",
        phone: "",
        username: "",
        password: "",
        birthDate: "",
        image: "",
        bloodGroup: "",
        height: 0,
        weight: 0,
        eyeColor: "",
        domain: "",
        ip: "",
        macAddress: "",
        university: "",
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        ein: "",
        ssn: "",
        userAgent: "",
      },
    ];

    const result = transformUserData(mockUsers);

    expect(result).toEqual({
      Engineering: {
        male: 1,
        female: 1,
        ageRange: "25-30",
        hair: {
          Black: 1,
          Brown: 1,
        },
        addressUser: {
          JohnDoe: "12345",
          JaneSmith: "67890",
        },
      },
      Marketing: {
        male: 1,
        female: 0,
        ageRange: "40-40",
        hair: {
          Blond: 1,
        },
        addressUser: {
          BobJohnson: "54321",
        },
      },
    });
  });

  it("should handle empty user array", () => {
    const result = transformUserData([]);
    expect(result).toEqual({});
  });
});
