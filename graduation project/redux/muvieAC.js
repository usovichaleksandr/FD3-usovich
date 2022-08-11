const LOAD_DATA='LOAD_DATA';
const ADD_TOP='ADD_TOP';
const LOAD_TOP='LOAD_TOP';

let loadingData_net=function(loadData){
    return{
        type:LOAD_DATA,
        loadData: loadData,
    };
}
let addingData_top=function(topNode){
    return{
        type:ADD_TOP,
        topNode: topNode,
    };
}
let loadingTop_net=function(loadTop){
    return{
        type:LOAD_TOP,
        loadTop:loadTop,
    }
}

export{
    loadingData_net, LOAD_DATA,
    addingData_top, ADD_TOP,
    loadingTop_net, LOAD_TOP,
};