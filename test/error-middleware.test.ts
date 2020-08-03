import { expect } from "chai";
import { errorHandler } from "../src/middleware/error";
import * as express from "express";
import sinon from "sinon";

describe("Error middleware", function () {
  let req = {
    params: {},
    body: {},
  } as express.Request;
  let res = {
    data: null as number | null,
    code: null as number | null,
    status: function (status: number | null) {
      this.code = status;
      return this;
    },
    sendStatus: function (status: number | null) {
      this.code = status;
      return this;
    },
    send: function (payload: any) {
      this.data = payload;
    },
    json: function (status: string, error: string) {
      return { status, error };
    },
  };
  let next = () => {};

  it("should set defined error message, statusCode, status", function () {
    const jsonStub = sinon.stub(res, "json");
    let err = { message: "Custom error", statusCode: 400, status: "error" };
    errorHandler(err, req, (res as unknown) as express.Response, next);
    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.args[0]).not.to.be.empty;
    expect(jsonStub.args[0][0]).to.have.property("error", err.message);
    expect(res.code).to.be.equal(400);
    jsonStub.restore();
  });
  it("should set 'Server Error' message and status code 500 if error is not defined", function () {
    const jsonStub = sinon.stub(res, "json");
    errorHandler(new Error(), req, (res as unknown) as express.Response, next);
    expect(res.code).to.be.equal(500);
    expect(jsonStub.calledOnce).to.be.true;
    expect(jsonStub.args[0][0]).to.have.property("error", "Server Error");
    expect(jsonStub.args[0]).not.to.be.empty;
    jsonStub.restore();
  });
});
