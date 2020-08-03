import { expect } from "chai";
import * as express from "express";
import sinon, { SinonStub, SinonSpy } from "sinon";
import models from "../src/models";
import project from "../src/models/project";
import {
  getProjects,
  getProject,
  postProject,
  postDuplicateProject,
  deleteProject,
} from "../src/controllers/projects";
import {
  allProjectsResponse,
  singleProjectResponse,
  duplicateProjectDataResponse,
} from "./__fixtures__";

describe("Project Controller", () => {
  let next: SinonSpy, json: SinonStub;
  let req = {
      params: null as any,
      body: null as any,
    },
    res = {
      body: null as any,
      code: null as number | null,
      status: function (status: number | null) {
        this.code = status;
        return this;
      },
      sendStatus: function (status: number | null) {
        this.code = status;
        return this;
      },
      json: function (body: any) {
        return body;
      },
    };
  beforeEach(() => {
    next = sinon.spy();
    json = sinon.stub(res, "json");
  });
  afterEach(() => {
    json.restore();
    next.resetHistory();
  });
  it("should pass 500 when GET /projects fails", async () => {
    let projectsStub = sinon.stub(models.Project, "list");
    projectsStub.resolves(undefined);
    await getProjects(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(next.args[0][0].message).to.be.equal("Server error");
    projectsStub.restore();
  });
  it("should pass 200 and send body when GET /projects succeeds", async () => {
    let projectsStub = sinon.stub(models.Project, "list");
    projectsStub.resolves(allProjectsResponse);
    await getProjects(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(projectsStub.calledOnce).to.be.true;
    expect(res.code).to.be.equal(200);
    expect(json.args[0][0]).to.be.equal(allProjectsResponse);
    expect(next.args[0]).to.be.undefined;
  });
  it("should pass 404 when GET /project/1 fails (project not found)", async () => {
    req.params = "1";
    let projectStub = sinon.stub(models.Project, "read");
    projectStub.resolves(undefined);
    await getProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(projectStub.calledOnce).to.be.true;
    expect(next.args[0][0].message).to.be.equal(
      "Project not found with id of undefined"
    );
    expect(next.args[0][0].statusCode).to.be.equal(404);
    projectStub.restore();
  });
  it("should return 200 and send body GET /projects succeeds", async () => {
    req.params = "1";
    let projectStub = sinon.stub(models.Project, "read");
    projectStub.resolves(singleProjectResponse);
    await getProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(projectStub.calledOnce).to.be.true;
    expect(res.code).to.be.equal(200);
    expect(json.args[0][0]).to.be.equal(singleProjectResponse);
    expect(next.args[0]).to.be.undefined;
    projectStub.restore();
  });

  it("should return code 201 and create a project on /POST", async () => {
    req.body = {
      title: "Tratata",
      description: "test",
      status: "in_progress",
      author_id: 1,
      price_per_hour: 5,
      hours_per_day: 5,
    };
    let instanceProjectStub = sinon
      .stub(models.Project, "create")
      .resolves({ id: 1, ...req.body, estimated_scope_id: 1 });
    await postProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(instanceProjectStub.calledOnce).to.be.true;
    expect(res.code).to.be.equal(201);
    instanceProjectStub.restore();
  });
  it("should return code 201 and duplicate project on /POST", async () => {
    req.params = {
      id: 1,
    };
    req.body = {
      author_id: 1,
    };
    let duplicateProjectStub = sinon
      .stub(models.Project, "duplicate")
      .resolves(duplicateProjectDataResponse);
    await postDuplicateProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(duplicateProjectStub.calledOnce).to.be.true;
    expect(res.code).to.be.equal(201);
    duplicateProjectStub.restore();
  });
  it("should return code 500 and not delete project on /DELETE fail", async () => {
    req.params = {
      id: 1,
    };
    let deleteProjectStub = sinon
      .stub(models.Project, "delete")
      .resolves(undefined);
    await deleteProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(deleteProjectStub.calledOnce).to.be.true;
    expect(next.args[0][0].message).to.be.equal("Server error");
    expect(next.args[0][0].statusCode).to.be.equal(500);
    deleteProjectStub.restore();
  });
  it("should return code 200 and delete project on /DELETE", async () => {
    req.params = {
      id: 1,
    };
    let deleteProjectStub = sinon
      .stub(models.Project, "delete")
      .resolves({} as any); // lookup here
    await deleteProject(
      req as express.Request,
      (res as unknown) as express.Response,
      next
    );
    expect(deleteProjectStub.calledOnce).to.be.true;
    expect(json.args[0][0].message).to.be.equal(
      "Project by id 1 was successfully deleted"
    );
    expect(res.code).to.be.equal(200);
    deleteProjectStub.restore();
  });
});
