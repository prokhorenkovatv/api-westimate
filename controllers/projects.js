const { validationResult } = require("express-validator");
const models = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const puppeteer = require("puppeteer");
const pdfTemplate = require("../templates");

exports.getProjects = asyncHandler(async (req, res, next) => {
  const projects = await models.Project.list();
  if (!projects) return next(new ErrorResponse("Server error", 500));
  res.status(200).json({ projects });
});

exports.postProject = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new ErrorResponse(
      "Validation failed, entered data is incorrect",
      422
    );

  const {
    title,
    description,
    status,
    author_id,
    price_per_hour,
    hours_per_day,
  } = req.body;

  const project = await models.Project.build(
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
  res
    .status(201)
    .json({ message: "Project was successfully created", project: newProject });
});

exports.getProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await models.Project.read(id);

  if (!project)
    return next(new ErrorResponse(`Project not found with id of ${id}`, 404));

  res.status(200).json(project);
});

exports.putProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    description,
    status,
    author_id,
    price_per_hour,
    hours_per_day,
    estimated_scope_id,
  } = req.body;

  const {
    analysis,
    infrastructure,
    design,
    qa,
    management,
    support,
    release,
  } = req.body.estimated_scope;

  const updateProjectObject = {
    title,
    description,
    status,
    author_id,
    price_per_hour,
    hours_per_day,
  };

  const updateEstimatedScopeObject = {
    analysis,
    infrastructure,
    design,
    qa,
    management,
    support,
    release,
  };

  const project = await res.send(
    Promise.all([
      models.Project.update(updateProjectObject, {
        where: { id: id },
      }),
      models.Estimated_scope.update(updateEstimatedScopeObject, {
        where: { id: estimated_scope_id },
      }),
    ])
  );

  // if (!project)
  //   return next(new ErrorResponse(`Project not found by id ${id}`, 404))
  if (!project) return next(new ErrorResponse("Server error", 500));

  const updatedProject = await models.Project.read(id);

  res.status(200).json(updatedProject).end();
});

exports.deleteProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const project = await models.Project.delete(id, models);
  if (!project) return next(new ErrorResponse("Server error", 500));
  res
    .status(200)
    .json({ message: `Project by id ${id} was successfully deleted` });
});

exports.postPdfProject = asyncHandler(async (req, res, next) => {
  const html = pdfTemplate(req.body);
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
});
