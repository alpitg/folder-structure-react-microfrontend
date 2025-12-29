import type { IUserWithPermissions } from "../../../interfaces/users.model";

const UserOrganisationUnitsFormApp = ({
  data,
}: {
  data?: IUserWithPermissions;
}) => {
  return <div className="user-info-form-app">"permiss" {data?.user?.id}</div>;
};

export default UserOrganisationUnitsFormApp;
