// import "./invoice.scss";

// import type { ITotalCalculationInput } from "../../../interfaces/order/order.model";

// interface InvoiceAppProps {
//   bill: ITotalCalculationInput;
// }

// const InvoiceApp = ({ bill }: InvoiceAppProps) => {
//   const dueDays = () => {
//     const today = new Date();
//     const dueDate = new Date(bill.likelyDateOfDelivery);
//     const timeDiff = dueDate.getTime() - today.getTime();
//     const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
//     return daysDiff > 0 ? daysDiff : 0;
//   };

//   return (
//     <div className="invoice-app">
//       <h3>Bill Calculation</h3>
//       <p>Calculate the bill here.</p>

//       <div className="card">
//         <div className="card-body p-lg-20">
//           <div className="d-flex flex-column flex-xl-row">
//             <div className="flex-lg-row-fluid me-xl-18 mb-10 mb-xl-0">
//               <div className="mt-n1">
//                 <div className="d-flex flex-stack pb-10">
//                   <a href="#">
//                     <img alt="Logo" src="/static/media/img/logo.png" />
//                   </a>
//                   <a href="#" className="btn btn-sm btn-success">
//                     Pay Now
//                   </a>
//                 </div>

//                 <div className="m-0">
//                   <div className="fw-bold fs-3 text-gray-800 mb-8">
//                     Invoice #34782
//                   </div>

//                   <div className="row g-5 mb-11">
//                     <div className="col-sm-6">
//                       <div className="fw-semibold fs-7 text-gray-600 mb-1">
//                         Issue Date:
//                       </div>
//                       <div className="fw-bold fs-6 text-gray-800">
//                         12 Apr 2021
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="fw-semibold fs-7 text-gray-600 mb-1">
//                         Due Date:
//                       </div>
//                       <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center flex-wrap">
//                         <span className="pe-2">02 May 2021</span>
//                         <span className="fs-7 text-danger d-flex align-items-center">
//                           <span className="bullet bullet-dot bg-danger me-2"></span>
//                           Due in 7 days
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row g-5 mb-12">
//                     <div className="col-sm-6">
//                       <div className="fw-semibold fs-7 text-gray-600 mb-1">
//                         Issue For:
//                       </div>
//                       <div className="fw-bold fs-6 text-gray-800">
//                         KeenThemes Inc.
//                       </div>
//                       <div className="fw-semibold fs-7 text-gray-600">
//                         8692 Wild Rose Drive <br />
//                         Livonia, MI 48150
//                       </div>
//                     </div>

//                     <div className="col-sm-6">
//                       <div className="fw-semibold fs-7 text-gray-600 mb-1">
//                         Issued By:
//                       </div>
//                       <div className="fw-bold fs-6 text-gray-800">
//                         CodeLab Inc.
//                       </div>
//                       <div className="fw-semibold fs-7 text-gray-600">
//                         9858 South 53rd Ave.
//                         <br />
//                         Matthews, NC 28104
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex-grow-1">
//                     <div className="table-responsive border-bottom mb-9">
//                       <table className="table mb-3">
//                         <thead>
//                           <tr className="border-bottom fs-6 fw-bold text-muted">
//                             <th className="min-w-175px pb-2">Description</th>
//                             <th className="min-w-70px text-end pb-2">Hours</th>
//                             <th className="min-w-80px text-end pb-2">Rate</th>
//                             <th className="min-w-100px text-end pb-2">
//                               Amount
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr className="fw-bold text-gray-700 fs-5 text-end">
//                             <td className="d-flex align-items-center pt-6">
//                               <i className="fa fa-genderless text-danger fs-2 me-2"></i>
//                               Creative Design
//                             </td>
//                             <td className="pt-6">80</td>
//                             <td className="pt-6">$40.00</td>
//                             <td className="pt-6 text-gray-900 fw-bolder">
//                               $3200.00
//                             </td>
//                           </tr>
//                           <tr className="fw-bold text-gray-700 fs-5 text-end">
//                             <td className="d-flex align-items-center">
//                               <i className="fa fa-genderless text-success fs-2 me-2"></i>
//                               Logo Design
//                             </td>
//                             <td>120</td>
//                             <td>$40.00</td>
//                             <td className="fs-5 text-gray-900 fw-bolder">
//                               $4800.00
//                             </td>
//                           </tr>
//                           <tr className="fw-bold text-gray-700 fs-5 text-end">
//                             <td className="d-flex align-items-center">
//                               <i className="fa fa-genderless text-primary fs-2 me-2"></i>
//                               Web Development
//                             </td>
//                             <td>210</td>
//                             <td>$60.00</td>
//                             <td className="fs-5 text-gray-900 fw-bolder">
//                               $12600.00
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>

//                     <div className="d-flex justify-content-end">
//                       <div className="mw-300px">
//                         <div className="d-flex flex-stack mb-3">
//                           <div className="fw-semibold pe-10 text-gray-600 fs-7">
//                             Subtotal:
//                           </div>
//                           <div className="text-end fw-bold fs-6 text-gray-800">
//                             $ 20,600.00
//                           </div>
//                         </div>
//                         <div className="d-flex flex-stack mb-3">
//                           <div className="fw-semibold pe-10 text-gray-600 fs-7">
//                             VAT 0%
//                           </div>
//                           <div className="text-end fw-bold fs-6 text-gray-800">
//                             0.00
//                           </div>
//                         </div>
//                         <div className="d-flex flex-stack mb-3">
//                           <div className="fw-semibold pe-10 text-gray-600 fs-7">
//                             Subtotal + VAT
//                           </div>
//                           <div className="text-end fw-bold fs-6 text-gray-800">
//                             $ 20,600.00
//                           </div>
//                         </div>
//                         <div className="d-flex flex-stack">
//                           <div className="fw-semibold pe-10 text-gray-600 fs-7">
//                             Total
//                           </div>
//                           <div className="text-end fw-bold fs-6 text-gray-800">
//                             $ 20,600.00
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="m-0">
//               <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px p-9 bg-lighten">
//                 <div className="mb-8">
//                   <span className="badge badge-light-success me-2">
//                     Approved
//                   </span>
//                   <span className="badge badge-light-warning">
//                     Pending Payment
//                   </span>
//                 </div>

//                 <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">
//                   PAYMENT DETAILS
//                 </h6>

//                 <div className="mb-6">
//                   <div className="fw-semibold text-gray-600 fs-7">Paypal:</div>
//                   <div className="fw-bold text-gray-800 fs-6">
//                     codelabpay@codelab.co
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <div className="fw-semibold text-gray-600 fs-7">Account:</div>
//                   <div className="fw-bold text-gray-800 fs-6">
//                     Nl24IBAN34553477847370033 <br />
//                     AMB NLANBZTC
//                   </div>
//                 </div>

//                 <div className="mb-15">
//                   <div className="fw-semibold text-gray-600 fs-7">
//                     Payment Term:
//                   </div>
//                   <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center">
//                     14 days
//                     <span className="fs-7 text-danger d-flex align-items-center">
//                       <span className="bullet bullet-dot bg-danger mx-2"></span>
//                       Due in 7 days
//                     </span>
//                   </div>
//                 </div>

//                 <h6 className="mb-8 fw-bolder text-gray-600 text-hover-primary">
//                   PROJECT OVERVIEW
//                 </h6>

//                 <div className="mb-6">
//                   <div className="fw-semibold text-gray-600 fs-7">
//                     Project Name
//                   </div>
//                   <div className="fw-bold fs-6 text-gray-800">
//                     SaaS App Quickstarter
//                     <a href="#" className="link-primary ps-1">
//                       View Project
//                     </a>
//                   </div>
//                 </div>

//                 <div className="mb-6">
//                   <div className="fw-semibold text-gray-600 fs-7">
//                     Completed By:
//                   </div>
//                   <div className="fw-bold text-gray-800 fs-6">
//                     Mr. Dewonte Paul
//                   </div>
//                 </div>

//                 <div className="m-0">
//                   <div className="fw-semibold text-gray-600 fs-7">
//                     Time Spent:
//                   </div>
//                   <div className="fw-bold fs-6 text-gray-800 d-flex align-items-center">
//                     230 Hours
//                     <span className="fs-7 text-success d-flex align-items-center">
//                       <span className="bullet bullet-dot bg-success mx-2"></span>
//                       35$/h Rate
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <div className="card">
//         <div className="card-body p-5">
//           <div className="row">
//             <div className="col-md-8">
//               <div className="p-5">
//                 <div className="header-section">
//                   <a href="#">
//                     <img alt="Logo" src="/static/media/img/logo.png" />
//                   </a>
//                   <div className="fs-4 mt-4 mb-4">Invoice #34782</div>
//                 </div>
//                 <div className="invoice-overview">
//                   <div className="m-0">
//                     <div className="row g-5 mb-5">
//                       <div className="col-sm-6">
//                         <div className="fs-7 text-muted mb-1">Issue Date:</div>
//                         <div className="fw-bold fs-6 text-gray-800">
//                           12 Apr 2021
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="fs-7 text-muted mb-1">Due Date:</div>
//                         <div className="fw-bold fs-6 d-flex align-items-center flex-wrap">
//                           <span className="pe-2">02 May 2021</span>
//                           <span className="fs-7 text-danger d-flex align-items-center">
//                             <span className="bullet bullet-dot bg-danger me-2"></span>
//                             Due in 7 days
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row g-5 mb-5">
//                       <div className="col-sm-6">
//                         <div className="fs-7 text-muted mb-1">Issue For:</div>
//                         <div className="fw-bold fs-6 text-gray-800">
//                           KeenThemes Inc.
//                         </div>
//                         <div className="fs-7 text-muted">
//                           8692 Wild Rose Drive <br />
//                           Livonia, MI 48150
//                         </div>
//                       </div>
//                       <div className="col-sm-6">
//                         <div className="fs-7 text-muted mb-1">Issued By:</div>
//                         <div className="fw-bold fs-6 text-gray-800">
//                           CodeLab Inc.
//                         </div>
//                         <div className="fs-7 text-muted">
//                           9858 South 53rd Ave.
//                           <br />
//                           Matthews, NC 28104
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="invoice-breakout">
//                   <div className="flex-grow-1">
//                     <div className="table-responsive border-bottom mb-9">
//                       <table className="table mb-3">
//                         <thead>
//                           <tr className="border-bottomfs-6 fw-bold text-muted">
//                             <th className="min-w-175px pb-2">Description</th>
//                             <th className="min-w-70px text-end pb-2">Hours</th>
//                             <th className="min-w-80px text-end pb-2">Rate</th>
//                             <th className="min-w-100px text-end pb-2">
//                               Amount
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr className="fw-bold text-gray-700fs-5 text-end">
//                             <td className="d-flex align-items-center pt-6">
//                               <i className="fa fa-genderless text-dangerfs-2 me-2"></i>
//                               Creative Design
//                             </td>
//                             <td className="pt-6">80</td>
//                             <td className="pt-6">$40.00</td>
//                             <td className="pt-6 text-gray-900 fw-bolder">
//                               $3200.00
//                             </td>
//                           </tr>
//                           <tr className="fw-bold text-gray-700fs-5 text-end">
//                             <td className="d-flex align-items-center">
//                               <i className="fa fa-genderless text-successfs-2 me-2"></i>
//                               Logo Design
//                             </td>
//                             <td>120</td>
//                             <td>$40.00</td>
//                             <td className="fs-5 text-gray-900 fw-bolder">
//                               $4800.00
//                             </td>
//                           </tr>
//                           <tr className="fw-bold text-gray-700fs-5 text-end">
//                             <td className="d-flex align-items-center">
//                               <i className="fa fa-genderless text-primaryfs-2 me-2"></i>
//                               Web Development
//                             </td>
//                             <td>210</td>
//                             <td>$60.00</td>
//                             <td className="fs-5 text-gray-900 fw-bolder">
//                               $12600.00
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="invoice-cost">
//                   <div className="d-flex justify-content-end">
//                     <div className="mw-300px">
//                       <div className="d-flex flex-stack mb-3">
//                         <div className=" pe-10text-muted fs-7">Subtotal:</div>
//                         <div className="text-end fw-bold fs-6 text-gray-800">
//                           $ 20,600.00
//                         </div>
//                       </div>
//                       <div className="d-flex flex-stack mb-3">
//                         <div className=" pe-10text-muted fs-7">VAT 0%</div>
//                         <div className="text-end fw-bold fs-6 text-gray-800">
//                           0.00
//                         </div>
//                       </div>
//                       <div className="d-flex flex-stack mb-3">
//                         <div className=" pe-10text-muted fs-7">
//                           Subtotal + VAT
//                         </div>
//                         <div className="text-end fw-bold fs-6 text-gray-800">
//                           $ 20,600.00
//                         </div>
//                       </div>
//                       <div className="d-flex flex-stack">
//                         <div className=" pe-10text-muted fs-7">Total</div>
//                         <div className="text-end fw-bold fs-6 text-gray-800">
//                           $ 20,600.00
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="m-0">
//                 <div className="d-print-none border border-dashed border-gray-300 card-rounded h-lg-100 min-w-md-350px bg-lighten p-4">
//                   <div className="mb-5">
//                     <span className="badge badge-light-success me-2">
//                       Approved
//                     </span>
//                     <span className="badge badge-light-warning">
//                       Pending Payment
//                     </span>
//                   </div>
//                   <h6 className="mb-4 fw-bolder text-muted">PAYMENT DETAILS</h6>
//                   <div className="mb-3">
//                     <div className="text-muted fs-7">Paypal:</div>
//                     <div className="fw-bold fs-6">codelabpay@codelab.co</div>
//                   </div>
//                   <div className="mb-3">
//                     <div className="text-muted fs-7">Account:</div>
//                     <div className="fw-bold fs-6">
//                       Nl24IBAN34553477847370033 <br />
//                       AMB NLANBZTC
//                     </div>
//                   </div>
//                   <div className="mb-15">
//                     <div className="text-muted fs-7">Payment Term:</div>
//                     <div className="fw-bold fs-6 d-flex align-items-center">
//                       14 days
//                       <span className="fs-7 text-danger d-flex align-items-center">
//                         <span className="bullet bullet-dot bg-danger mx-2"></span>
//                         Due in 7 days
//                       </span>
//                     </div>
//                   </div>
//                   <h6 className="mb-4 fw-bolder text-gray-600 text-muted">
//                     PROJECT OVERVIEW
//                   </h6>
//                   <div className="mb-3">
//                     <div className="text-muted fs-7">Project Name</div>
//                     <div className="fw-bold fs-6 text-gray-800">
//                       SaaS App Quickstarter
//                       <a href="#" className="link-primary ps-1">
//                         View Project
//                       </a>
//                     </div>
//                   </div>
//                   <div className="mb-3">
//                     <div className="text-muted fs-7">Completed By:</div>
//                     <div className="fw-bold fs-6">Mr. Dewonte Paul</div>
//                   </div>
//                   <div className="m-0">
//                     <div className="text-muted fs-7">Time Spent:</div>
//                     <div className="fw-bold fs-6 d-flex align-items-center">
//                       230 Hours
//                       <span className="fs-7 text-success d-flex align-items-center">
//                         <span className="bullet bullet-dot bg-success mx-2"></span>
//                         35$/h Rate
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <br />
//         </div>
//       </div> */}

//       <br />
//     </div>
//   );
// };

// export default InvoiceApp;
