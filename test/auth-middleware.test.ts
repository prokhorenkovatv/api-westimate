import { expect } from "chai";
import { authMiddleware } from "../src/middleware/isAuth";
import * as express from "express";
import sinon from "sinon";
import jwt from "jsonwebtoken";

describe("Auth middleware", () => {
  let req = {
    headers: {},
  } as express.Request;
  let res = {} as express.Response;

  it("should invoke ErrorResponse in the next function if authorization header is undefined", function () {
    req.headers["authorization"] = undefined;
    let next = sinon.spy();
    authMiddleware(req, res, next);
    expect(next.args[0]).not.to.be.empty; // check if there is something to pass in next
    expect(next.args[0][0].message).to.be.equal("Token was not provided");
    expect(next.args[0][0].statusCode).to.be.equal(401);
    next.resetHistory();
  });
  it("should invoke ErrorResponse if token cannot be verified", function () {
    req.headers["authorization"] = "Bearer dddd";
    let next = sinon.spy();
    authMiddleware(req, res, next);
    expect(next.args[0]).not.to.be.empty;
    expect(next.args[0][0].message).to.be.equal("Invalid token");
    expect(next.args[0][0].statusCode).to.be.equal(401);
    next.resetHistory();
  });
  it("should call token verification if header is valid", function () {
    req.headers["authorization"] = "Bearer ffff";
    let next = sinon.spy();
    let jwtVerifyStub = sinon
      .stub(jwt, "verify")
      .callsFake(() => ({ id: "abc", type: "access" }));

    authMiddleware(req, res, next);
    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(next.args[0]).to.be.empty; //call next without args
    next.resetHistory();
    jwtVerifyStub.restore();
  });
  it("should invoke ErrorResponse if it has wrong type of token", function () {
    req.headers["authorization"] = "Bearer aaaa";
    let next = sinon.spy();
    let jwtVerifyStub = sinon
      .stub(jwt, "verify")
      .callsFake(() => ({ id: "abc", type: "refresh" }));

    authMiddleware(req, res, next);
    expect(jwtVerifyStub.calledOnce).to.be.true;
    expect(next.args[0]).not.to.be.empty;
    expect(next.args[0][0].message).to.be.equal("Invalid token");
    expect(next.args[0][0].statusCode).to.be.equal(401);
    next.resetHistory();
    jwtVerifyStub.restore();
  });
});
