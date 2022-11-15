import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {setState} from "../Redux/States/State";
import {RootNode} from "../Redux/States/State";



export default function Tree({refresh,setRefresh}) {


    const State=useSelector(state=>state.State)
    const Root=State.Root
    const selectedItem=State.selector

  return (
    <Box sx={{background:"#f0f0f0",}}>
    hola
    </Box>
  );
}


