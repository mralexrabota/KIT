// import { User } from "@api";
import _ from "lodash";

import { DBError } from "../../api/error/databaseError";
import { User } from "../../DB/models/User";



/**
 * Method for get user by params
 * @param params - params for search user
 */
async function GetUser(params: { [prop: string]: any }) {
  try {
    const user = await User.findOne(params);

    if (!_.isNil(user)) {
      return user;
    } else {
      /** @todo заменить на общий механизм ошибок */
      return new DBError({ message: 'User not found', name: 'user', type: 'not_found' });
    }
  } catch (error) {
    return error;
  }
}


/**
 * Method for set user param
 * @param id user id
 * @param params - params for search user
 */
async function SetUser(id: string, params: { [prop: string]: any }) {
  try {
    const user = await User.findByIdAndUpdate(id, params);

    if (!_.isNil(user)) {
      return user;
    } else {
      /** @todo заменить на общий механизм ошибок */
      return new DBError({ message: 'User not found', name: 'user', type: 'not_found' });
    }
  } catch (error) {
    return error;
  }
}



export const UserApi = {
  GetUser,
  SetUser
};