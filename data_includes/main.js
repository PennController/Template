PennController.ResetPrefix(null);


PennController.AddHost("https://raw.githubusercontent.com/PennController/Template/PrimedLexical/distant_resources/")

PennController.AddTable("words", 
`Prime	Target	PrePrimeISI	PrimeToTargetISI	PostTargetISI
beast.mp3	beat.mp3	200	100	200
beat.mp3	camp.mp3	200	100	200
camp.mp3	dit.mp3	200	100	200
dit.mp3	duck.mp3	200	100	200
duck.mp3	face.mp3	200	100	200
face.mp3	foon.mp3	200	100	200
foon.mp3	fout.mp3	200	100	200
fout.mp3	beast.mp3	200	100	200`
)

PennController.Sequence( "welcome" , randomize("test") , "send" , "final" )

// PennController.DebufOff()    // Uncomment when ready to publish

PennController( "welcome" ,
    newButton("Start")
        .print()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)


PennController.Template( "words" , 
    row => PennController( "test" ,
        newTimer(row.PrePrimeISI)
            .start()
            .wait()
        ,
        newAudio("prime", row.Prime)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        newText("Instructions", "Press F if what you heard is a word, J otherwise")
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
        newTimer(row.PrimeToTargetISI)
            .start()
            .wait()
        ,
        newAudio("target", row.Target)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
            .wait()
        ,
        getText("Instructions")
            .print()
        ,
        newKey("answerTarget", "FJ")
            .settings.log("all")            // Empty parameter (defaulting to "wait") bugs
            .wait()
        ,
        newTimer(row.PostTargetISI)
            .start()
            .wait()
        
    )
    .log( "ID" , PennController.GetURLParameter("id") )
    .log("Prime"  , row.Prime  )
    .log("Target" , row.Target )
)


PennController.SendResults("send")


PennController( "final" ,
    newText("Thank you for taking this experiment!")
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar", false)
