import models from "models";
import ErrorResponse from "utils/errorResponse";
import { asyncHandler } from "middleware/async";
import puppeteer from "puppeteer";
import pdfTemplate from "templates";
import { Request, Response, NextFunction } from "express";

const getProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projects = await models.Project.list();
    if (!projects) return next(new ErrorResponse("Server error", 500));
    res.status(200).json(projects);
  }
);

const postProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      title,
      description,
      status,
      author_id,
      price_per_hour,
      hours_per_day,
    } = req.body;

    const project = models.Project.build(
      {
        title,
        description,
        status,
        author_id,
        price_per_hour,
        hours_per_day,
      },
      { include: [models.Estimated_scope] }
    );

    const newProject = await project.create(models);
    if (!newProject) return next(new ErrorResponse("Server error", 500));
    res.status(201).json(newProject);
  }
);

const postDuplicateProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { author_id } = req.body;
    const project = await models.Project.duplicate(+id, author_id, models);

    if (!project)
      return next(new ErrorResponse(`Project not found with id of ${id}`, 404));
    res.status(201).json(project);
  }
);

const getProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await models.Project.read(+id);

    if (!project)
      return next(new ErrorResponse(`Project not found with id of ${id}`, 404));

    res.status(200).json(project);
  }
);

const patchProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const p = await models.Project.read(+id); // we should find estimated_scope_id first.. it's not me, it's sequelize

    const project = await Promise.all([
      models.Project.update(req.body, {
        where: { id: id },
      }),
      models.Estimated_scope.update(req.body.estimated_scope, {
        where: { id: p.estimated_scope_id },
      }),
    ]);

    if (!project) return next(new ErrorResponse("Server error", 500));

    const updatedProject = await models.Project.read(+id);
    res.status(200).json(updatedProject).end();
  }
);

const deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const project = await models.Project.delete(+id, models);
    if (!project) return next(new ErrorResponse("Server error", 500));
    res
      .status(200)
      .json({ message: `Project by id ${id} was successfully deleted` });
  }
);

const postPdfProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const project = await models.Project.read(id);
    const html = pdfTemplate(project);
    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    await browser.close();
    if (!pdf) return next(new ErrorResponse("Server error", 500));
    res.send(pdf).end();
  }
);

export {
  getProjects,
  postProject,
  getProject,
  postDuplicateProject,
  postPdfProject,
  patchProject,
  deleteProject,
};
