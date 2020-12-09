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
        newAudio("preamble", row.preamble)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
        ,
        newTimer(row.time1)
            .start()
            .wait()
        ,
        newText("word1",row.word1)
            .center()
            .print()
        ,
        newText("Instructions", "Press F if what you heard is a word, J otherwise")
            .center()
            .print()
        ,
        newKey("answerPrime", "FJ")
            .settings.log("all")            // Empty parameter (defaulting to "wait") bugs
            .wait()
            .settings.disable()             // Prevents conflicts with answerTarget
        ,
        getText("Instructions")
            .remove()
        ,
        getText("word1")
            .remove()
        ,
        newAudio("target", row.target)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
        ,
        newTimer(row.time2)
            .start()
            .wait()
        ,
        newText("word1",row.word2)
            .center()
            .print()
        ,
        getText("Instructions")
            .center()
            .print()
        ,
        newKey("answerTarget", "FJ")
            .settings.log("all")            // Empty parameter (defaulting to "wait") bugs
            .wait()
        ,
        newAudio("post_target", row.posttarget)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
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
