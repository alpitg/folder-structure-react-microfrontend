import { FormProvider, useForm } from "react-hook-form";
import type {
  IOrganizationUnitTree,
  IOrganizationUnitsData,
} from "../../../interfaces/organization-units.model";
import { useDeleteOrganizationUnitMutation, useGetOrganizationUnitsQuery } from "../../../../../app/redux/administration/organization-units/organization-units.api";

import ModelApp from "../../../../../components/ui/model/model";
import OrganizationTreeFormApp from "../form/organization-tree-form";
import { useState } from "react";

/** Extend the props so parent can pass selectedId + onSelect */
interface OrganizationTreeNodeProps extends IOrganizationUnitTree {
  onSelect?: (node: IOrganizationUnitTree) => void;
  selectedId?: string | null;
}

const OrganizationTreeNodeApp = (props: OrganizationTreeNodeProps) => {
  const { refetch } = useGetOrganizationUnitsQuery();
  const [deleteOrganizationUnit] = useDeleteOrganizationUnitMutation();

  const [expanded, setExpanded] = useState(false);
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const methods = useForm<IOrganizationUnitsData>();

  const hasChildren = props?.children && props?.children.length > 0;

  /** Highlight if this node is the selected one */
  const isSelected = props.selectedId === props.id;

  /** handle selecting a node */
  const handleSelect = () => {
    props.onSelect?.(props); // pass node back to parent
  };

  /** Handle delete confirmation */
  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await deleteOrganizationUnit(props.id).unwrap();
      setShowDeleteConfirmation(false);
      refetch();
    } catch (error) {
      console.error("Failed to delete organization unit:", error);
      setShowDeleteConfirmation(false);
    } finally {
      setIsDeleting(false);
    }
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
          <i
            className="bi bi-trash text-danger cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirmation(true);
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

      {/* Add Organization Unit Modal */}
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

      {/* Delete Confirmation Modal */}
      <ModelApp
        show={showDeleteConfirmation}
        modelSize="sm"
        onClose={() => setShowDeleteConfirmation(false)}
      >
        <div className="p-3">
          <h5 className="mb-3">Delete Organization Unit</h5>
          <p className="text-muted mb-3">
            Are you sure you want to delete <strong>{props?.label}</strong>? This action cannot be undone.
          </p>
          <div className="d-flex gap-2 justify-content-end">
            <button
              className="btn btn-secondary"
              onClick={() => setShowDeleteConfirmation(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </ModelApp>
    </div>
  );
};

export default OrganizationTreeNodeApp;
