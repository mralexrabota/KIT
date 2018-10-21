import { IError, InputParamError } from "../../error";
import { User } from "../../../database/models";



export default class UserQuery {
  static getUser(email: string) {

    let errors: IError[] = [];

    if (!email) {
      errors.push({ name: 'emial', message: 'param -emial- not found', type: 'input' });
    }

    if (errors.length) throw new InputParamError(errors);

    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    })
  }


  /**
   * Function for create user
   * @param userParam - params for create user
   */
  static createUser(userParam) {

    let errors: IError[] = [];

    if (!userParam) {
      errors.push({ name: 'userParam', message: 'param -userParam- not found', type: 'input' });
    }

    if (errors.length) throw new InputParamError(errors);


    const user = new User(userParam);

    return new Promise((resolve, reject) => {
      user.save((error, data) => {
        if (error) {
          console.error(error);
          reject(error);
        }

        if (data) {
          resolve(data);
        }
      })
    });
  }


  /**
   * Function for update user
   * @param userParam - params for update user
   */
  static async updateUser(userParam) {

    let errors: IError[] = [];

    if (!userParam) {
      errors.push({ name: 'userParam', message: 'param -userParam- not found', type: 'input' });
    }

    if (errors.length) throw new InputParamError(errors);



    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ email: userParam.email }, { $set: userParam }, { new: true }, (err, doc) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
        return doc;
      });
    });
  }
}