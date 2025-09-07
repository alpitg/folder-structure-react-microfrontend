const NotificationSettingApp = () => {
  return (
    <div className="card">
      <div className="card-header border-0 cursor-pointer" role="button">
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">Notifications</h3>
        </div>
      </div>

      <div id="kt_account_settings_notifications" className="collapse show">
        <form className="form">
          <div className="card-body border-top px-9 pt-3 pb-4">
            <div className="table-responsive">
              <table className="table table-row-dashed border-gray-300 align-middle gy-6">
                <tbody className="fs-6 fw-semibold">
                  <tr>
                    <td className="min-w-250px fs-4 fw-bold">Notifications</td>
                    <td className="w-125px">
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="kt_settings_notification_email"
                          defaultChecked
                          data-kt-check="true"
                          data-kt-check-target="[data-kt-settings-notification=email]"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="kt_settings_notification_email"
                        >
                          Email
                        </label>
                      </div>
                    </td>
                    <td className="w-125px">
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="kt_settings_notification_phone"
                          defaultChecked
                          data-kt-check="true"
                          data-kt-check-target="[data-kt-settings-notification=phone]"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="kt_settings_notification_phone"
                        >
                          Phone
                        </label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Billing Updates</td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="1"
                          id="billing1"
                          defaultChecked
                          data-kt-settings-notification="email"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="billing1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="billing2"
                          defaultChecked
                          data-kt-settings-notification="phone"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="billing2"
                        ></label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>New Team Members</td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="team1"
                          defaultChecked
                          data-kt-settings-notification="email"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="team1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="team2"
                          data-kt-settings-notification="phone"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="team2"
                        ></label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Completed Projects</td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="project1"
                          data-kt-settings-notification="email"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="project1"
                        ></label>
                      </div>
                    </td>
                    <td>
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="project2"
                          defaultChecked
                          data-kt-settings-notification="phone"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="project2"
                        ></label>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className="border-bottom-0">Newsletters</td>
                    <td className="border-bottom-0">
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="newsletter1"
                          data-kt-settings-notification="email"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="newsletter1"
                        ></label>
                      </div>
                    </td>
                    <td className="border-bottom-0">
                      <div className="form-check form-check-custom form-check-solid">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="newsletter2"
                          data-kt-settings-notification="phone"
                        />
                        <label
                          className="form-check-label ps-2"
                          htmlFor="newsletter2"
                        ></label>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button className="btn btn-light btn-active-light-primary me-2">
              Discard
            </button>
            <button className="btn btn-primary px-6">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettingApp;
