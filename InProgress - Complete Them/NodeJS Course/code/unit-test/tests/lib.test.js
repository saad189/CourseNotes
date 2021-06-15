test("Our first test", () => {});

const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return positive number, if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return negative number, if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Saad");
    expect(result).toMatch(/Saad/);
    //or toContain
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies ", () => {
    const result = lib.getCurrencies();

    // Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // To specific
    expect(result[0]).toBe("USD");

    //Ideal:
    expect(result).toEqual(expect.arrayContaining(["AUD", "USD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("should return the product with given id", () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({ id: 1, price: 10 });
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1); // property with exact value and type
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    //Null | undefined | NaN | '' | 0 | false

    const args = [null, undefined, NaN, "", 0, false];

    args.forEach((v) => {
      expect(() => {
        lib.registerUser(v);
      }).toThrow();
    });
  });

  it("should return user object if valid username is passed", () => {
    const result = lib.registerUser("Saad");
    expect(result).toMatchObject({ username: "Saad" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    db.getCustomerSync = function (customerId) {
      console.log("Fake reading customer");
      return { id: customerId, points: 20 };
    };

    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });

    mail.send = jest.fn().mockReturnValue(true);
    lib.notifyCustomers({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send).toHaveBeenCalledWith("a", "Your order has been placed");
    expect(mail.send.mock.calls[0][0]).toBe("a");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
