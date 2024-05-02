import { register, login, logout } from "./auth/AuthControllerAdmin.js";
import {
  addPro,
  deletePro,
  getProd,
  getProds,
  updatePro,
  getNotif,
  getlive
} from "./product/Product.js";
import {createLive } from "./live/live.js";
// import {liveShow} from './live/getLive.js'
import { updateAdmin } from "./updateAdmin/UpdateAdmin.js";
import { getAdmin } from "./getAdmins/GetAdmin.js";
import { getAdmins } from "./getAdmins/GetAdmins.js";
// import { getNotif } from "./getAdmins/GetAdmins.js";
export const AuthControllerAdmin = Object.freeze({
  register,
  login,
  logout,
});
export const Admin = Object.freeze({
  updateAdmin,
  getAdmin,
  getAdmins
})

export const productController = Object.freeze({
  addPro,
  deletePro,
  updatePro,
  getProd,
  getProds,
  getNotif,
  getlive
});   
export const liveController = Object.freeze({
  createLive,
  // getLive
})
// export const showController = Object.freeze({
//   liveShow
// })