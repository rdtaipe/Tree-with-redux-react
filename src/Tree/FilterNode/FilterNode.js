import React, { Fragment, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setState} from "../../Redux/States/State";
import {RootNode} from "../../Redux/States/State";


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';

import Collapse from '@mui/material/Collapse';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';





const Complete=({input,setInputText})=>{
  const dispatch = useDispatch()

  const setStates = (value) => dispatch(setState(value))
  const setRootNode = (value) => dispatch(RootNode(value))

  const [options, setOptions] = React.useState([]);
  const Root=useSelector(state=>state.State.Root)
  React.useEffect(() => {
 


    if(input.length>0){
      let arr = []
      filterNode(input,Root)
      function filterNode(name,Root) {
        for (var i = 0; i < Root.length; i++) {
          if (Root[i].name.toLowerCase().includes(name.toLowerCase())) {
            arr.push(Root[i]);
          }
          if (Root[i].children.length > 0) {
            filterNode(name, Root[i].children);
          } 
        }
      }
      setOptions(arr)
    }
  }, [input]);


  const onSelected=(e,node)=>{
    console.log(node)
    setStates({type:"obj",keys:"selector.item",value:node})
    setRootNode({to:"modify",id:"all",key:"selected",value:false})
    setRootNode({to:"modify",id:node.id,key:"selected",value:true})
    setRootNode({to:"find",id:node.id})
    setInputText("")
  }

  if(options.length>0&&input.length>0){

    return (
      <Paper elevation={0}  sx={{mt:4, width: '100%',position:"absolute",zIndex:999 }}>
        <MenuList>
        {
          options.map((item,i)=>{
    
            return(
              <MenuItem onClick={(e)=>onSelected(e,item)} key={i}>
            <ListItemIcon>

                {
                  item.type==="folder"?
                  <FolderIcon fontSize="small" />:
                  item.type==="file"?
                  <InsertDriveFileIcon fontSize="small" />:null
                }
                              

            </ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
            )

        })
        }

        </MenuList>
      </Paper>
    )
  }
}


 const FilterNode = () => {
    const [showMnenu, setShowMenu] = useState(false);
    const [refresh, setRefresh] = useState(false);

    var loading=useSelector(state=>state.State.filter.group)
    const handleShowMenu = () => {
        setShowMenu(!showMnenu);
    }
    return (
        <>
        <Paper
        elevation={0}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%" }}
        >
          <IconButton 
          sx={{ p: '10px' }} 
          aria-label="menu"
            onClick={handleShowMenu}
          >
           {loading.length>0? <CircularProgress color="inherit" size={20} /> : null}
              

            <MenuIcon />
          </IconButton>
        <Filter/>



          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>


          {/* {
                showMnenu && <Menu/>
          } */}
        

        </Paper>
        <Collapse in={showMnenu} timeout="auto" unmountOnExit>
              
              <Menu  
              refresh={refresh} 
        setRefresh={setRefresh}/>
   
    </Collapse>
        </>
      );

 }

 const Menu=({refresh,setRefresh})=>{
  const dispatch = useDispatch()
  const setRootNode = (value) => dispatch(RootNode(value))
  const OnAddFolder = () => {
    setRootNode({to:"addFolder",id:"all"})
    setRefresh(!refresh)

  }

  const OnAddFile = () => {
    setRootNode({to:"addFile",id:"all"})
    setRefresh(!refresh)

  }




    return (
      <Paper elevation={0} sx={{ width: "100%" }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={()=>OnAddFolder()}>
            <ListItemIcon>
              <FolderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Nueva Carpeta</ListItemText>
          </MenuItem>
          <MenuItem onClick={()=>OnAddFile()}>
            <ListItemIcon >
              <InsertDriveFileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Nuevo Ducumento</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  }
  const Filter=()=>{
    const [inputText, setInputText] = useState("Buscar nodo");

    
    return (
        <FormControl sx={{ width: '100%' }}>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscar nodo"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={(e)=>setInputText(e.target.value)}

          /> 

          <Complete input={inputText} setInputText={setInputText}/>


        </FormControl>


       
    );
  }
  
export default FilterNode;




