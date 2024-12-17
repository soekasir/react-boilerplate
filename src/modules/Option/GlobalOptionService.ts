import { Service } from "typedi";
import { makeObservable, observable } from "mobx";
import DatabaseLocal from "../../utils/DatabaseLocal";
var _ = require('lodash');

export type MenuState = 'workspace'|'setting';

/**
 * Digunakan untuk menyimpan pengaturan secara global (cross component),
 * yang akan disave di local database
 */
@Service()
export class GlobalOptionService {

  /** showing active menu in sidebar */
  menuState: MenuState = 'workspace';

  isLeftSidebarVisible:boolean=true;

  /** showing menu icon */
  isLeftPanelVisible:boolean=true;

  appTheme:string='orangeDark';

  leftSidebarWidth:string="320px";

  constructor(){
    makeObservable(this,{
      menuState: observable,
      isLeftSidebarVisible: observable,
      isLeftPanelVisible: observable,
      appTheme: observable,
      leftSidebarWidth: observable,
    })
    this.loadSettingFromDatabaseLocal()
  }

  /** if curent state same as parameter state, it will turn off left sidebar, eitherwise, it will change leftSidebarState */
  changeLeftSidebarState = (state:MenuState) => {
    if(state===this.menuState){
      this.handleTogleLeftSidebarVisibility()
    }else{
      this.menuState=state
    }
  };

  handleTogleLeftSidebarVisibility=()=>{
    this.isLeftSidebarVisible=!this.isLeftSidebarVisible
  }

  /** leftPanel and sidebar will disable if fullContentView Active */
  handleFullContentView=()=>{
    if(this.isLeftPanelVisible){
      this.isLeftPanelVisible=false;
      this.isLeftSidebarVisible=false;
    }else{
      this.isLeftPanelVisible=true;
      this.isLeftSidebarVisible=true;
    }
  }

  saveSettingInDatabaseLocal=()=>{
    const key="global-option-service";
    // yang diomit tidak untuk disave
    const dataSetting=Object.assign({},_.omit(this,['tabGroup','leftSidebarState','menuState']))
    const string=JSON.stringify(dataSetting)
    DatabaseLocal.setItem(key,string)
  }

  loadSettingFromDatabaseLocal=()=>{
    const key="global-option-service";
    const dataSetting=JSON.parse(DatabaseLocal.getItem(key)??'{}')
    Object.assign(this,dataSetting);
  }

  handleKeyDown=(keyboardEvent: React.KeyboardEvent<HTMLDivElement>)=>{
    if(keyboardEvent.ctrlKey){

      if(keyboardEvent.key==='s'){ // ctrl+s

      }

      if(keyboardEvent.key==='b'){  // ctrl+b
        this.handleFullContentView()
      }

    }

  }

}