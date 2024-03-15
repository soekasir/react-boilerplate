import { AxiosService } from "../AxiosService";
import { Api } from "../../utils/typedi";

@Api()
export class FakerApi extends AxiosService{
  constructor(){
    super('https://fakerapi.it/api/v1/')
  }

  persons(_quantity:number,gender:'male'|'female'){
    return this.get('persons',{
      params:{_quantity,gender}
    })
  }
}
