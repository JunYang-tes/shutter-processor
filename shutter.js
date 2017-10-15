
module.exports = function (injected) {
  const utils = injected.utils
  const { debug } = injected.logger("shutter")
  console.log(debug)
  const { cmdsRequired } = utils
  return utils.decorate( {
    range: cmdsRequired(["shutter"], () => {
      return [
        {
          text: "Capture a range",
          param: {
            action: "cmd",
            cmd: "shutter",
            args: ["-s"]
          }
        }
      ]
    }),
    full:cmdsRequired(["shutter"],()=>{
      return [
        {
          text:"Capture the entire screen",
          param:{
            action:"cmd",
            cmd:"shutter",
            args:["-f"]
          }
        }
      ]
    }),
    window:cmdsRequired(["shutter"],()=>{
      return [
        {
          text:"Capture a window",
          param:{
            action:"cmd",
            cmd:"shutter",
            args:["--section"]
          }
        }
      ]
    })
  },(self, processor) =>(opt)=>{
    let ret = processor.call(self,opt)
    ret[0].text=`${ret[0].text}, --delay seconds`
    if("delay" in opt){
      ret[0].param.args.push(...["--delay",opt.delay])
    }
    return ret
  })
}