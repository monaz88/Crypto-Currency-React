
function ConvertData(data,type) {
  const converedData=data[type].map((item)=>{
      return{
            data:item[0],
            [type]:item[1],
      }
  })
  return converedData;

}


export {ConvertData}
