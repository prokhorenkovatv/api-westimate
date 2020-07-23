"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.patchProject = exports.postPdfProject = exports.postDuplicateProject = exports.getProject = exports.postProject = exports.getProjects = void 0;
const models_1 = __importDefault(require("models"));
const errorResponse_1 = __importDefault(require("utils/errorResponse"));
const async_1 = require("middleware/async");
const puppeteer_1 = __importDefault(require("puppeteer"));
const templates_1 = __importDefault(require("templates"));
const getProjects = async_1.asyncHandler(async (req, res, next) => {
    const projects = await models_1.default.Project.list();
    if (!projects)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(200).json(projects);
});
exports.getProjects = getProjects;
const postProject = async_1.asyncHandler(async (req, res, next) => {
    const { title, description, status, author_id, price_per_hour, hours_per_day, } = req.body;
    const project = models_1.default.Project.build({
        title,
        description,
        status,
        author_id,
        price_per_hour,
        hours_per_day,
    }, { include: [models_1.default.Estimated_scope] });
    const newProject = await project.create(models_1.default);
    if (!newProject)
        return next(new errorResponse_1.default("Server error", 500));
    res.status(201).json(newProject);
});
exports.postProject = postProject;
const postDuplicateProject = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { author_id } = req.body;
    const project = await models_1.default.Project.duplicate(+id, author_id, models_1.default);
    if (!project)
        return next(new errorResponse_1.default(`Project not found with id of ${id}`, 404));
    res.status(201).json(project);
});
exports.postDuplicateProject = postDuplicateProject;
const getProject = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const project = await models_1.default.Project.read(+id);
    if (!project)
        return next(new errorResponse_1.default(`Project not found with id of ${id}`, 404));
    res.status(200).json(project);
});
exports.getProject = getProject;
const patchProject = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const p = await models_1.default.Project.read(+id); // we should find estimated_scope_id first
    const project = await Promise.all([
        models_1.default.Project.update(req.body, {
            where: { id: id },
        }),
        models_1.default.Estimated_scope.update(req.body.estimated_scope, {
            where: { id: p.estimated_scope_id },
        }),
    ]);
    if (!project)
        return next(new errorResponse_1.default("Server error", 500));
    const updatedProject = await models_1.default.Project.read(+id);
    res.status(200).json(updatedProject).end();
});
exports.patchProject = patchProject;
const deleteProject = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const project = await models_1.default.Project.delete(+id, models_1.default);
    if (!project)
        return next(new errorResponse_1.default("Server error", 500));
    res
        .status(200)
        .json({ message: `Project by id ${id} was successfully deleted` });
});
exports.deleteProject = deleteProject;
const postPdfProject = async_1.asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const project = await models_1.default.Project.read(id);
    const html = templates_1.default(project);
    const browser = await puppeteer_1.default.launch({
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
    if (!pdf)
        return next(new errorResponse_1.default("Server error", 500));
    res.send(pdf).end();
});
exports.postPdfProject = postPdfProject;
