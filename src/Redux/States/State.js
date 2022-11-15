import { createSlice } from "@reduxjs/toolkit";

var initialState = {
  filter:{
    item:null,
    group: [],

  },
  selector: {
    item: null,
    group: [],
    actions:{
      rename:false,
      copy:false,
      cut:false,
      remove:false,
      select:false,
    }
  },
  Root: [
    {
      name: "documento 1",
      id: "x3guytyde",
      value: {},
      type: "file",
      open: false,
      active: false,
      selected: false,
      icon: {},
      children: []
    },
    {
      name: "documento 2",
      id: "q7fknnupf",
      value: {},
      type: "file",
      open: false,
      active: false,
      selected: false,
      icon: {},
      children: []
    },
    {
      name: "archivo 1",
      id: "c6n1ffxd",
      value: {},
      type: "folder",
      open: false,
      active: false,
      selected: false,
      icon: {},
      children: [
        {
          name: "documento 12",
          id: "x3gud3dge",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: [
            {
              name: "documento 2",
              id: "q7fm8kpf",
              value: {},
              type: "file",
              open: false,
              active: false,
              selected: false,
              icon: {},
              children: [
                {
                  name: "documento 2",
                  id: "q7fkpzxf",
                  value: {},
                  type: "file",
                  open: false,
                  active: false,
                  selected: false,
                  icon: {},
                  children: [
                    {
                      name: "documento 2",
                      id: "q7fkpf",
                      value: {},
                      type: "file",
                      open: false,
                      active: false,
                      selected: false,
                      icon: {},
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: "documento 31",
          id: "q7fzxkpf",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        },
        {
          name: "documento 31",
          id: "zq7fqwkpf",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        },
        {
          name: "documento 31",
          id: "q7fkqwpf",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        },
        {
          name: "documento 31",
          id: "q7fkswpf",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        }
      ]
    },
    {
      name: "documento 24",
      id: "8fc2v5",
      value: {},
      type: "file",
      open: false,
      active: false,
      selected: false,
      icon: {},
      children: []
    },
    {
      name: "archivo 2",
      id: "c6n1fd",
      value: {},
      type: "folder",
      open: false,
      active: false,
      selected: false,
      icon: {},
      children: [
        {
          name: "documento 12",
          id: "x3gude",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        },
        {
          name: "documento 31",
          id: "q7fkpf",
          value: {},
          type: "file",
          open: false,
          active: false,
          selected: false,
          icon: {},
          children: []
        }
      ]
    }
  ]
};

export const State = createSlice({
  name: "useState",
  initialState: initialState,
  reducers: {
    setState: (state, action) => {
      var Action = action.payload;
      //{type:"obj",name:"null",key:"null",value:{},}
      //{type:"arr",name:"null",item:"null"value:{},}

      //recursive insert
      ///new {type:"obj",name:"element.element.elemt"value:{},}

var keys = Action.keys.split(".");
if(Action.type==="obj"){

//   recursive(state, 0)
// ['selector', 'actions', 'rename']

const recursive =(state, i)=>{
  if (i < keys.length-1){//si no es el ultimo elemento
    recursive(state[keys[i]], i + 1);//seguir auto ejecutando enviando el elemento siguiente
  }else{
    state[keys[i]] = Action.value;
  }

}
recursive(state, 0)

}

    },

    RootNode: (state, action) => {
      var Action = action.payload;
      //Action={id:"na",key:"na",value:null}
      var Root = state.Root;
      var selector = state.selector //save select node values 


      var fileNodeDefault={
        name: "new file",
        type: "file",
        icon: {},
        children: []
      }
      var folderNodeDefault={
        name: "new folder",
        type: "folder",
        icon: {},
        children: []
      }


      function Node(value){
        this.name =value.name;
        this.id =  hashName(value.name);
        this.value = {};
        this.type = value.type;
        this.open =false;
        this.active = false;
        this.selected =false;
        this.icon = {};
        this.children = value.children;
      }


      var hashName=(name)=>{
        var dateNow=Date.now()
        return name.charCodeAt(name.length).toString(36).substring(2, 36) + dateNow.toString(36).substring(2, 36)+dateNow
      }
     



   if(Action.to==="modify"){
      
      if(Action.id!=="all"){

        changeNode(Action.key,Action.value,Root)
   
      }else if(Action.id==="all"){
        changeAllNode(Action.key,Action.value,Root)

      }

    }else if(Action.to==="delete"){
      if(Action.id!=="all"){
        deleteNode(Action.id,Root)
      }else if(Action.id==="select"){
        var items=state.group

        deleteAllNode(Root,items)
      }

    }else if(Action.to==="addFile"){
      var node = new Node(fileNodeDefault)
      if(Action.id!=="all"){
        addNodeToSide(Action.id,node,Root)
      }else{
        addNodeDefault(node,Root)
      }

    }else if(Action.to==="addFolder"){
      var node = new Node(folderNodeDefault)
      if(Action.id!=="all"){
        addNodeToSide(Action.id,node,Root)
      }else{
        addNodeDefault(node,Root)
      }

    }
    else if(Action.to==="find"){
   
      if(Action.id!==null&&Action.id!==undefined){
       
        autoOpen(Action.id,Root)
      }

     
    }



      //find node
      function findNode(id,Root) {
        for (var i = 0; i < Root.length; i++) {
          if (Root[i].id === id) {
            return Root[i];
          } else if (Root[i].children.length > 0) {
            var node = findNode(id, Root[i].children);
            if (node) {
              return node;
            }
          }
        }
      }


      function changeNode(key, value,Root) {
        var node = findNode(Action.id, Root);
        node[key] = value;
      }

      function changeAllNode(key, value,Root) {

        for (var i = 0; i < Root.length; i++) {
          Root[i][key] = value;

          if (Root[i].children.length > 0) {
            changeAllNode(key, value, Root[i].children);
          }

        }
      }
     


      function deleteNode(id,Root) {
        for (var i = 0; i < Root.length; i++) {
          if (Root[i].id === id) {
            Root.splice(i, 1);
            return;
          } else if (Root[i].children.length > 0) {
            deleteNode(id, Root[i].children);
          }
        }
      }

      function deleteAllNode(Root,items) {
        for (var i = 0; i < Root.length; i++) {
          if (items.includes(Root[i].id)) {
            Root.splice(i, 1);
            return;
          } else if (Root[i].children.length > 0) {
            deleteAllNode(Root[i].children,items);
          }
        }
      }
   
     

      function Open(Root, Action) {
        Root.map((item, index) => {
          if (item.id === Action.id) {
            item.open = !item.open;
          }
        });
      }

      function addNodeToSide(id,node,Root){
        var parenet=findNode(id,Root)
       return parenet.children.push(node)

      }
      function addNodeDefault(node,Root){
        return Root.push(node)
      }

      function autoOpen(id,Root){
        console.log(id)
        for (var i = 0; i < Root.length; i++) {
          if (Root[i].id === id) {
            Root[i].open = true;
          } else if (Root[i].children.length > 0) {
            var node = autoOpen(id, Root[i].children)
            if (node) {
             node.open = true;
            }
            

          }
        }
      }
      

    }
  }
});

// Action creators are generated for each case reducer function
export const { setState, RootNode } = State.actions;

export default State.reducer;
