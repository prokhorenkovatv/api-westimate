import { expect } from "chai";
import * as express from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import models from "../src/models";
import { signIn, refreshTokens } from "../src/controllers/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

describe("Auth Controller", () => {
  describe("Sign in", () => {
    let findOneUser: SinonStub, req: express.Request, next: SinonSpy;
    const bcryptPass = bcrypt.hashSync("test", 10);
    let stubbedUser = {
      id: 1,
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      phone: null,
      password: bcryptPass,
      gender: null,
      onboarding_at: null,
    };
    beforeEach(() => {
      findOneUser = sinon.stub(models.User, "findOne");

      req = {
        body: {
          email: "test@test.com",
          password: "test",
        },
      } as express.Request;
      next = sinon.spy();
    });
    afterEach(() => findOneUser.restore());
    it("should return 401 status if accessing the database fails", async () => {
      findOneUser.resolves(null);
      const user = signIn(req, {} as express.Response, next);
      expect(user).to.be.a("promise");
      await user;
      expect(next.args[0][0].statusCode).to.be.equal(401);
    });
    it("should validate password", async () => {
      findOneUser.resolves(stubbedUser);
      let isValidStub = sinon.stub(bcrypt, "compareSync").callsFake(() => true);

      const user = signIn(req, {} as express.Response, next);
      expect(user).to.be.a("promise");
      await user;
      expect(isValidStub.calledOnce).to.be.true;
      expect(next.args[0][0].statusCode).to.be.equal(500);
      isValidStub.restore();
    });
    it("should pass to next ErrorResponse with code 401", async () => {
      findOneUser.resolves(stubbedUser);
      let isValidStub = sinon
        .stub(bcrypt, "compareSync")
        .callsFake(() => false);
      const user = signIn(req, {} as express.Response, next);
      expect(user).to.be.a("promise");
      await user;
      expect(isValidStub.calledOnce).to.be.true;
      expect(next.args[0][0].statusCode).to.be.equal(401);
      isValidStub.restore();
    });
  });
  describe("Refresh tokens", () => {
    let findOneToken: SinonStub, req: express.Request;
    beforeEach(() => {
      findOneToken = sinon.stub(models.Token, "findOne");

      req = {
        body: {
          refreshToken: "refresh",
        },
      } as express.Request;
    });
    afterEach(() => {
      findOneToken.restore();
    });
    it("should pass ErrorResponse with code 400, when type of token is not 'refresh'", async () => {
      let next = sinon.spy();
      let refreshJwtVerifyStub = sinon
        .stub(jwt, "verify")
        .callsFake(() => ({ id: 1, type: "access" }));
      await refreshTokens(req, {} as express.Response, next);
      expect(refreshJwtVerifyStub.calledOnce).to.be.true;
      expect(next.args[0]).not.to.be.empty;
      expect(next.args[0][0].message).to.be.equal("Invalid token");
      expect(next.args[0][0].statusCode).to.be.equal(400);
      refreshJwtVerifyStub.restore();
    });
    it("should pass code 400 when retrieved token is null", async () => {
      findOneToken.resolves(null);
      let next = sinon.spy();
      let refreshJwtVerifyStub = sinon
        .stub(jwt, "verify")
        .callsFake(() => ({ id: 1, type: "refresh" }));
      await refreshTokens(req, {} as express.Response, next);
      expect(refreshJwtVerifyStub.calledOnce).to.be.true;
      expect(next.args[0]).not.to.be.empty;
      expect(next.args[0][0].message).to.be.equal("Invalid token");
      expect(next.args[0][0].statusCode).to.be.equal(400);
      refreshJwtVerifyStub.restore();
    });
    it("should pass code 400 and message 'token expired' if token expired", async () => {
      let next = sinon.spy();
      let e = sinon.createStubInstance(jwt.TokenExpiredError);
      e.expiredAt = new Date(2020, 6, 29); //random date in past
      let refreshJwtVerifyStub = sinon.stub(jwt, "verify").throws(e);
      await refreshTokens(req, {} as express.Response, next);
      expect(next.args[0][0].message).to.be.equal("Token expired");
      expect(next.args[0][0].statusCode).to.be.equal(400);

      refreshJwtVerifyStub.restore();
    });
    it("should pass code 400 and message 'invalid token' if there's some error with verification", async () => {
      let next = sinon.spy();
      let e = sinon.createStubInstance(jwt.JsonWebTokenError);
      e.inner = new Error("Invalid token");
      let refreshJwtVerifyStub = sinon.stub(jwt, "verify").throws(e);
      await refreshTokens(req, {} as express.Response, next);
      expect(next.args[0][0].message).to.be.equal("Invalid token");
      expect(next.args[0][0].statusCode).to.be.equal(400);
      refreshJwtVerifyStub.restore();
    });
  });
});
