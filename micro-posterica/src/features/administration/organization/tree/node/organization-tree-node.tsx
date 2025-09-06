import { FormProvider, useForm } from "react-hook-form";
import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../../interfaces/organization-units.model";

import ModelApp from "../../../../../components/ui/model/model";
import OrganizationTreeFormApp from "../form/organization-tree-form";
import { useGetOrganizationUnitsQuery } from "../../../../../app/redux/administration/organization-units/organization-units.api";
import { useState } from "react";

/** Extend the props so parent can pass selectedId + onSelect */
interface OrganizationTreeNodeProps extends IOrganizationUnitTree {
  onSelect?: (node: IOrganizationUnitTree) => void;
  selectedId?: string | null;
}

const OrganizationTreeNodeApp = (props: OrganizationTreeNodeProps) => {
  const { refetch } = useGetOrganizationUnitsQuery();

  const [expanded, setExpanded] = useState(false);
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const methods = useForm<IOrganizationUnitsData>();

  const hasChildren = props?.children && props?.children.length > 0;

  /** Highlight if this node is the selected one */
  const isSelected = props.selectedId === props.id;

  /** handle selecting a node */
  const handleSelect = () => {
    props.onSelect?.(props); // pass node back to parent
  };

  return (
    <div>
      <li className="list-unstyled">
        <div
          className={`d-flex align-items-center py-2 gap-3 ${
            isSelected ? "bg-light border-start border-4 border-primary" : ""
          }`}
          onClick={handleSelect}
        >
          {/* Chevron */}
          {hasChildren ? (
            expanded ? (
              <i
                className={`bi bi-chevron-down text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
              />
            ) : (
              <i
                className={`bi bi-chevron-right text-muted ${
                  hasChildren ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
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
            onClick={(e) => {
              e.stopPropagation();
              setShowAddModel(!showAddModel);
            }}
          />
        </div>

        {/* Children */}
        {hasChildren && expanded && (
          <ul className="ms-4 mt-1 list-unstyled">
            {props?.children.map((child, index) => (
              <OrganizationTreeNodeApp
                key={index}
                {...child}
                onSelect={props.onSelect}
                selectedId={props.selectedId}
              />
            ))}
          </ul>
        )}
      </li>

      <ModelApp
        show={showAddModel}
        modelSize="sm"
        onClose={() => setShowAddModel(false)}
      >
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
