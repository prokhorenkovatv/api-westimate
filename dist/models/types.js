"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.Status = void 0;
//Attributes
var Status;
(function (Status) {
    Status["DEVREVIEW"] = "dev_review";
    Status["ACCEPTED"] = "accepted";
    Status["INACTIVE"] = "inactive";
    Status["INPROGRESS"] = "in_progress";
})(Status = exports.Status || (exports.Status = {}));
var UserRole;
(function (UserRole) {
    UserRole["MEMBER"] = "member";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
// export interface UserTeamCreationAttributes
//   extends Optional<UserTeamAttributes, "id"> {}
