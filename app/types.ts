import { Issue, WorkflowState, User, IssueRelation } from "@linear/sdk";

export type ExtendedIssue = Pick<
  Issue,
  "id" | "identifier" | "priority" | "title" | "estimate"
> &
  Partial<Pick<WorkflowState, "name">> &
  Pick<User, "avatarUrl"> & {
    relations: Pick<IssueRelation, "id" | "type">[];
  };
