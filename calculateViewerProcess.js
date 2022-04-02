function spliceSlice(str, index, count, add) {
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }

  return str.slice(0, index) + (add || "") + str.slice(index + count);
}

process.stdin.on("data", (chunk) => {
  const startString = "chat_sidebar_contact_rankings";
  //   return console.log(chunk);
  const index1 =
    chunk.indexOf("chat_sidebar_contact_rankings") +
    startString.length +
    ":[".length +
    1;
  let newString = chunk.slice(index1);
  let result = [];
  try {
    while (newString.indexOf('{"status"') !== -1) {
      let start = newString.indexOf('{"status"');
      let end = newString.indexOf('"}}}') + 4;
      const info = JSON.parse(
        newString.slice(0, newString.indexOf('"}}}') + 4)
      );
      result.push(info);
      newString = spliceSlice(newString, start, end + 1, "");
      //   console.log(newString.slice(0, 300), start, end);
    }
    return console.log(JSON.stringify(result));
  } catch (e) {
    return console.log(e.message);
  }
});

// process.stdout.on("data",(chunk)=>{
// 	return console.log("xxxx");
// })
// process.stdin.on("data",(chunk)=>{
// 	return console.log(chunk);
// })
