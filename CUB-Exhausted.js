// CUB-Exhausted macro
//console.debug(`args:`,args);
if (args[0] == "on") {
    var exNew = args[1].efData.label
    const levels = ["Exhaustion 1","Exhaustion 2","Exhaustion 3","Exhaustion 4","Exhaustion 5"]
    for(const ex of levels){
        await new Promise(resolve => setTimeout(resolve, 500));
        if ((ex != exNew) && (game.cub.hasCondition(ex))){
          await game.cub.removeCondition(ex)
        }
    }
}