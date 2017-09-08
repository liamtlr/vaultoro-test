function parseUrl(url){
  let parsedUrl = "https://www.youtube.com/embed/";
  let uniqueId;
  const watchArr = url.split("watch?v=");
  const shareArr = url.split("youtu.be/");
  const embedArr = url.split("embed/");
  if(watchArr.length === 2){
    uniqueId = watchArr[1];
  } else if (shareArr.length === 2){
    uniqueId  =  shareArr[1];
  } else if (embedArr.length === 2){
    uniqueId = embedArr[1];
  }
  return parsedUrl + removedAdditionalParams(uniqueId);
};

function removedAdditionalParams(uniqueId){
  const arr = uniqueId.split("&");
  return arr[0];
}

export { parseUrl, removedAdditionalParams }
