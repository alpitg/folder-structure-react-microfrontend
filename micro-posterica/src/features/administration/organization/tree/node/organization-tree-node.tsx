import { FormProvider, useForm } from "react-hook-form";
import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../../interfaces/organization-units.model";

import ModelApp from "../../../../../components/ui/model/model";
import OrganizationTreeFormApp from "../form/organization-tree-form";
import { useGetOrganizationUnitsQuery } from "../../../../../app/redux/administration/organization-units/organization-units.api";
import { useState } from "react";

const OrganizationTreeNodeApp = (props: IOrganizationUnitTree) => {
  const { refetch } = useGetOrganizationUnitsQuery();

  const [expanded, setExpanded] = useState(false);
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const methods = useForm<IOrganizationUnitsData>();

  const hasChildren = props?.children && props?.children.length > 0;

  return (
    <div>
      <li className="list-unstyled">
        <div
          className="d-flex align-items-center py-2 gap-3"
        >
          {/* Chevron */}
          {hasChildren ? (
            expanded ? (
              <i
                className={`bi bi-chevron-down text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => hasChildren && setExpanded(!expanded)}
              />
            ) : (
              <i
                className={`bi bi-chevron-right text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() => hasChildren && setExpanded(!expanded)}
              />
            )
          ) : (
            <span className="me-3"></span>
          )}

          {/* Folder Icon */}
          {expanded ? (
            <i className="bi bi-folder2-open text-primary" />
          ) : (
            <i className="bi bi-folder text-primary" />
          )}

          {/* Label */}
          <span>
            {props?.label}
            <small className="text-muted ms-2">
              ({props?.members} Members, {props?.roles} Roles)
            </small>
          </span>

          <i
            className="bi bi-plus-lg text-muted cursor-pointer"
            onClick={() => setShowAddModel(!showAddModel)}
          />
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <ul className="ms-4 mt-1 list-unstyled">
            {props?.children.map((child, index) => (
              <OrganizationTreeNodeApp key={index} {...child} />
            ))}
          </ul>
        )}
      </li>

      <ModelApp show={showAddModel}>
        <FormProvider {...methods}>
          <OrganizationTreeFormApp
            parent={props}
            onClose={() => setShowAddModel(false)}
            onSuccess={refetch}
          />
        </FormProvider>
      </ModelApp>
    </div>
  );
};

export default OrganizationTreeNodeApp;
