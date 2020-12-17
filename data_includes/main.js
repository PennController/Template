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
        defaultText
        .center()
        .print()
        ,
        newText("Instructions", "WORD: Press <b>F</b> &nbsp &nbsp &nbsp NOT A WORD: Press <b>J</b> <br> ")
        .print()
        ,
        newCanvas("wordtoshow", 200, 20)
        .center()
        .css( "border" , "solid 3px black" )
        .print()
        ,
        newTimer(row.time1)
        .callback(
         getCanvas("wordtoshow").add("center at 50%", "middle at 50%", newText("word1",row.word1))
        ,
        newKey("answerPrime", "FJ").log().wait()
        ,
        getText("word1").remove()
        )
        .start()
        ,
        newAudio("preamble", row.preamble)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("word1").remove()
        ,
        getKey("answerPrime").disable()
        ,
        newTimer(row.time2).callback(
        getCanvas("wordtoshow").add("center at 50%", "middle at 50%", newText("word2",row.word2))
        ,
        newKey("answerPrime", "FJ").log().wait()
        ,
        getText("word2").remove()
        ).start()
        ,
        newAudio("target", row.target)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("word2").remove()
        ,
        getKey("answerTarget").disable()
        ,
        newAudio("post_target", row.posttarget)
            .log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("Instructions").remove()
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
