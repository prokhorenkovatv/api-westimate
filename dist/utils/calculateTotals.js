"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotals = void 0;
exports.calculateTotals = (p, es, ef) => {
    const total_frontend_days = ef.reduce((a, b) => a + b.frontend_days, 0);
    const total_backend_days = ef.reduce((a, b) => a + b.backend_days, 0);
    const design_days = es.isDesignActive
        ? (es.design / 100) * total_frontend_days
        : 0;
    const qa_days = es.isQaActive
        ? (es.qa / 100) * (total_frontend_days + total_backend_days)
        : 0;
    const infrastructure_days = es.isInfrastructureActive
        ? es.infrastructure
            ? es.infrastructure
            : 0
        : 0;
    const management_days = es.isManagementActive
        ? (es.management / 100) * (total_frontend_days + total_backend_days)
        : 0;
    const release_days = es.isReleaseActive ? (es.release ? es.release : 0) : 0;
    const analysis_days = es.isAnalysisActive
        ? es.analysis
            ? es.analysis
            : 0
        : 0;
    const support_days = es.isSupportActive ? (es.support ? es.support : 0) : 0;
    const total_estimation_days = design_days +
        qa_days +
        infrastructure_days +
        management_days +
        release_days +
        analysis_days +
        support_days;
    const total_mandays = total_estimation_days + total_frontend_days + total_backend_days;
    const total_hours = p.hours_per_day * total_mandays;
    const total_price = p.price_per_hour * total_hours;
    return {
        total_frontend_days,
        total_backend_days,
        design_days,
        qa_days,
        infrastructure_days,
        management_days,
        release_days,
        analysis_days,
        support_days,
        total_estimation_days,
        total_mandays,
        total_hours,
        total_price,
    };
};
