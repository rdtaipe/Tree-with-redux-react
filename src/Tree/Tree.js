import React,{useState} from 'react';

import TreeList from './TreeList/TreeList'
import FilterNode from './FilterNode/FilterNode'
import InfoNode from './InfoNode/InfoNode'

import Card from '@mui/material/Card';

export  const Tree = () => {
    const [refresh, setRefresh] = useState(false);
    return (
        <Card sx={{width:430}}>
        <FilterNode     
        refresh={refresh} 
        setRefresh={setRefresh}/>

        <TreeList
        refresh={refresh} 
        setRefresh={setRefresh}
        />

        <InfoNode/>
        </Card>
    );
};





