PennController.ResetPrefix(null) // Shorten command names (keep this line here))

Sequence( "welcome" , randomize("test") , "send" , "final" )

newTrial( "welcome" ,
    newText("In this experiment you will have to decide if the visuals shown on screen are the words.")
        .center()
        .print()
    ,
    newText("Press F for true, and J for false if visual is a word.")
        .center()
        .print()
    ,
    newButton("Start")
        .center()
        .print()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)

Template( "data.csv" , 
    row => PennController( "test" ,
        defaultText.center().print()
        ,
        newTimer(row.time1).callback(
            newText("word1",row.word1)
            ,
            newText("Instructions", "Press F if what you heard is a word, J otherwise")
            ,
            newKey("answerPrime", "FJ").log().wait()
            ,
            getText("word1").remove()
            ,
            getText("Instructions").remove()
        ).start()
        ,
        newAudio("preamble", row.preamble)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("Instructions").remove()
        ,
        getText("word1").remove()
        ,
        getKey("answerPrime").disable()
        ,
        newTimer(row.time2).callback(
            newText("word2",row.word2)
            ,
            getText("Instructions").print()
            ,
            newKey("answerTarget", "FJ").log().wait()
            ,
            getText("word2").remove()
            ,
            getText("Instructions").remove()
        ).start()
        ,
        newAudio("target", row.target)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("word2").remove()
        ,
        getText("Instructions").remove()
        ,
        getKey("answerTarget").disable()
        ,
        newAudio("post_target", row.posttarget)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        newText("Press SPACE to continue")
        ,
        newKey(" ").wait()
    )
    .log( "ID" , PennController.GetURLParameter("id") )
    .log( "Group", row.group)
    .log("Word1"  , row.word1 )
    .log("Word2" , row.word2 )
)


SendResults("send")


newTrial ( "final" ,
    newText("Thank you for taking this experiment!")
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar", false)
