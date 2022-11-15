import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {setState} from "../../Redux/States/State";
import {RootNode} from "../../Redux/States/State";

import styled from "styled-components";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

//list 
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
//list
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';


//icons

import { Button, CardActionArea, CardActions } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const TreeItem = ({node,children,refresh,setRefresh}) => {
  const dispatch = useDispatch()
  var selected=node.selected
  const [name, setName] = useState(node.name);
  const actions=useSelector(state=>state.State.selector.actions)
  const virtualItem=useSelector(state=>state.State.selector.item)

  const setStates = (value) => dispatch(setState(value))
  const setRootNode = (value) => dispatch(RootNode(value))
  //{type:"obj",name:"null",key:"null",value:{},}
  //{type:"arr",name:"null",item:"null"value:{},}

  const OnSelectItem = (node) => {
        setRefresh(!refresh)
        setStates({type:"obj",keys:"selector.item",value:node})
        setRootNode({to:"modify",id:"all",key:"selected",value:false})
        setRootNode({to:"modify",id:node.id,key:"selected",value:true})


    if(virtualItem.id!==node.id){
      if(actions.rename===true){
          setStates({type:"obj",keys:"selector.actions.rename",value:false})
      
      }
    }
    }
    const OnChangeNodeName = (e,node) => {
        var value=e.target.value
        setName(value)
        setRootNode({to:"modify",id:node.id,key:"name",value:value})

    }
    const onOpen = (node) => {
      setRefresh(!refresh)
      setRootNode({to:"modify",id:node.id,key:"open",value:!node.open})
    }


  return (
    <Box >
    
    <ListItemButton sx={{py:0}}
          onClick={e => {
            OnSelectItem(node);
          }}
       
          
    style={{background: `${selected ? "rgba(24,90,188,.3)" : ""}`}} >
   
    
    {node.type==="folder"?(


        <ListItemIcon onClick={() => onOpen(node)}>
            {
           node.open ?
            <><ExpandLess /><FolderOpenIcon /></>
            :
            <><ExpandMore /><FolderIcon/></> 
            }
            
         </ListItemIcon>

      

        ):(

            <ListItemIcon sx={{pl:"20px",mr:"-20px"}}>
            <InsertDriveFileIcon />
            </ListItemIcon>
        )}
        {selected?<>
        {actions.rename===true?
        <ListItemText sx={{py:1}}>
        <Paper  elevation={0}  component="form"  >
        <InputBase sx={{px:1}}
        value={name}
        onChange={e => OnChangeNodeName(e, node)}
        >

        </InputBase>

        </Paper>
        </ListItemText>
            : 
        <ListItemText sx={{py:1}}>
            {name}
        </ListItemText>
        }</>
        : 
        <ListItemText sx={{py:1}}>
            {name}
        </ListItemText>
        }
    
        {node.type==="folder"?
            <>{selected?<>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <FileRenameIconTree node={node} />
            <InsertFileIconTree node={node} refresh={refresh} setRefresh={setRefresh}/>
            <FolderIconTree node={node} refresh={refresh} setRefresh={setRefresh}/>
            <DeleteIconTree node={node}/>
            </>:null
            
            }</>:selected?<>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <FileRenameIconTree node={node}/>
            <DeleteIconTree node={node}/>
            </>:null
        
        
        }

    </ListItemButton>
    
    <Collapse in={node.open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItemButton>
                    <ListItemText primary={children} />
            </ListItemButton>
        </List>
    </Collapse>

    </Box>
  );
};



const DeleteIconTree=({node})=>{
    const dispatch = useDispatch()
    const setStates = (value) => dispatch(setState(value))
    const setRootNode = (value) => dispatch(RootNode(value))

    const OnDeleteItem = (node) => {
        setRootNode({to:"delete",id:node.id})
        setStates({type:"obj",keys:"selector.item",value:{}})
    }

    return(
        <IconButton color="primary"  sx={{ p: "2px" }} onClick={() => OnDeleteItem(node)}>
        <DeleteIcon fontSize="small"/>
        </IconButton>
    )
}
const FileRenameIconTree=({node})=>{
    const dispatch = useDispatch()
    const actions=useSelector(state=>state.State.selector.actions)

    const setStates = (value) => dispatch(setState(value))
  
    
    const OnRenameItem = (node) => {
     
        setStates({type:"obj",keys:"selector.actions.rename",value:!actions.rename})

    }


    return(
        <IconButton color="primary"  sx={{p: "2px" }} onClick={() => OnRenameItem(node)}>
       
       {actions.rename?
        <EditIcon color="primary" size="small" sx={{p: "2px"}}/> 
       : 
       <DriveFileRenameOutlineRoundedIcon color="primary" size="small" sx={{p: "2px"}}/>
        }
       
       
        </IconButton>
    )
}

const InsertFileIconTree=({node,refresh,setRefresh})=>{
  const dispatch = useDispatch()
  const setRootNode = (value) => dispatch(RootNode(value))
  

  const OnAddFile = (node) => {
    setRootNode({to:"modify",id:node.id,key:"open",value:true})
    setRootNode({to:"addFile",id:node.id})
    setRefresh(!refresh)

  }
    return(
        <IconButton color="primary"  sx={{ p: "2px" }} onClick={()=>OnAddFile(node)}>
        <InsertDriveFileIcon fontSize="small"/>
        </IconButton>
    )
}
const FolderIconTree=({node,refresh,setRefresh})=>{
  const dispatch = useDispatch()
  const setRootNode = (value) => dispatch(RootNode(value))
  const OnAddFolder = (node) => {
    setRootNode({to:"modify",id:node.id,key:"open",value:true})
    setRootNode({to:"addFolder",id:node.id})
    setRefresh(!refresh)
  }
    return(
        <IconButton color="primary"  sx={{ p: "2px" }} onClick={()=>OnAddFolder(node)} >
        <FolderIcon fontSize="small"/>
        </IconButton>
    )
}





const RecursiveTree = ({ root ,refresh,setRefresh}) => {




  const createTree = branch => { //reuseable function to create the tree 
    return (
      <TreeItem
        node={branch}
        refresh={refresh} 
        setRefresh={setRefresh}
      >
        {branch.children.map(branch => {
          return (
            <Fragment key={branch.id}>
              {createTree(branch)}  {/* Recursive  call*/}
            
            </Fragment>
          );
        })}
      </TreeItem>

    );
  };


  return (
    <Box>
      {root.map((children, i) =>
        <Box key={i}>
          {createTree(children)}
        </Box>
      )}
    </Box>
  );
};

export default function Tree({refresh,setRefresh}) {


    const State=useSelector(state=>state.State)
    const Root=State.Root
    const selectedItem=State.selector

  return (
    <Box sx={{background:"#f0f0f0",}}>
      <RecursiveTree
        root={Root}
        refresh={refresh} 
        setRefresh={setRefresh}
      />
    </Box>
  );
}


