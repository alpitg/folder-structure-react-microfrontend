import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import type { IOrganizationUnitsData } from "../../interfaces/organization-units.model";
import ModelApp from "../../../../components/ui/model/model";
import OrganizationTreeFormApp from "./form/organization-tree-form";
import OrganizationTreeNodeApp from "./node/organization-tree-node";
import { buildOrganizationUnitTree } from "./organization-tree.util";
import { useAddOrganizationUnitsMutation } from "../../../../app/redux/administration/organization-units/organization-units.api";

const OrganizationTreeApp = ({
  data,
  refetch,
}: {
  data?: IOrganizationUnitsData[];
  refetch: () => void;
}) => {
  const [showAddModel, setShowAddModel] = useState<boolean>(false);
  const methods = useForm<IOrganizationUnitsData>();
  const { isSuccess: isAddSuccess } = useAddOrganizationUnitsMutation()[1];

  useEffect(() => {
    if (isAddSuccess) {
      refetch();
    }
  }, [isAddSuccess, refetch]);

  const treeData = buildOrganizationUnitTree(data || []);

  return (
    <div className="card shadow-sm mb-4 border-0">
      <div className="card-header d-flex justify-content-between align-items-center border-0">
        <h5 className="mb-0">Organisation Tree</h5>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModel(true)}
        >
          <i className="bi bi-plus-lg fs-3"></i>
          Add Root unit
        </button>
      </div>

      <div className="card-body pt-2">
        {treeData.length === 0 ? (
          <div className="text-muted">No organisation unit defined yet.</div>
        ) : (
          <ul className="list-unstyled mb-0">
            {treeData.map((node, index) => (
              <OrganizationTreeNodeApp key={index} {...node} />
            ))}
          </ul>
        )}
      </div>

      <ModelApp show={showAddModel}>
        <FormProvider {...methods}>
          <OrganizationTreeFormApp
            onClose={() => setShowAddModel(false)}
            onSuccess={refetch}
          />
        </FormProvider>
      </ModelApp>
    </div>
  );
};

export default OrganizationTreeApp;
