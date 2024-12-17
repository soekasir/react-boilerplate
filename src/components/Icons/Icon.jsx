import { FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { codeExtension, getExtension } from "../../utils/extension";
import { fileIcons } from "./fileIcons";
import { folderIcons } from "./folderIcons";
import { ReactSVG } from 'react-svg';

export const FolderIcon = ({ isOpen, foldername }) =>{
  const icon = folderIcons.find((folderIcon) => {
    if (folderIcon.folderNames.find((folderName)=>folderName===foldername)) {
      return true
    }
    return false
  })

  if (icon && isOpen) {
    return <ReactSVG src={"/images/material-icons/" + icon.name +"-open.svg"} alt={icon.name} className="icon" />
  }

  if (icon) {
    return <ReactSVG src={"/images/material-icons/" + icon.name + ".svg"} alt={icon.name} className="icon" />
  }

  if(isOpen){
    return  <FaRegFolderOpen className="icon" />
  }

  return  <FaRegFolder className="icon" />
}

/**
 * 
 * @param {{filename:string}} param0 
 * @returns 
 */
export const FileIcon = ({ filename }) => {
  const extension = getExtension(filename);

  const icon = fileIcons.find((fileIcon) => {
    if (fileIcon.fileNames?.includes(filename)) {
      return true
    }

    const filenameMatchExtension = fileIcon.fileExtensions?.find((exts) => {
      const splitedFIlename = filename.split(".").reverse();
      const splitedExts = exts.split(".").reverse()
      if ((splitedExts[0] === splitedFIlename[0]) && (splitedExts[1] === splitedFIlename[1])) {
        return true
      }
      if ((splitedExts[0] === splitedFIlename[0]) && (splitedExts[1] === splitedFIlename[1]) && (splitedExts[2] === splitedFIlename[2])) {
        return true
      }
      return false
    })

    if (filenameMatchExtension) {
      return true
    }

    if (fileIcon.fileExtensions?.includes(extension)) {
      return true
    }

    return false
  })
  if (icon) {
    return <ReactSVG src={"/images/material-icons/" + icon.name + ".svg"} alt={icon.name} className="icon" />
  }

  const isCodeExtension = codeExtension[extension] ?? undefined
  if (isCodeExtension) {
    return <ReactSVG src={"/images/material-icons/" + isCodeExtension.language + ".svg"} alt={isCodeExtension.language} className="icon" />
    // return <isCodeExtension.icon className="icon" />;
  }
  else {
    return <FiFileText className="icon" />;
  }

};


export const WorkspaceIcon = ({ isOpen }) =>{
  if(isOpen){
    return  <FaRegFolderOpen className="icon icon-workspace" />
  }
  return  <FaRegFolder className="icon icon-workspace" />
}