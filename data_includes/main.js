PennController.ResetPrefix(null);


PennController.AddHost("https://raw.githubusercontent.com/PennController/Template/PrimedLexical/distant_resources/")

PennController.AddTable("words", "https://docs.google.com/spreadsheets/d/e/2PACX-1vQv6XOt7DJjBF96JrGgr5p9cZISZsEP3aTt5ARDzKzwVBZcKkkGHyZn3xn0vMID7kzkeCT2lK51FwNv/pub?gid=0&single=true&output=csv")

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
        newTimer(200)
            .start()
            .wait()
        ,
        newAudio(row.Filename)
            .play()
            .wait()
        ,
        newText("Press F if what you heard is a word, J otherwise")
            .print()
        ,
        newKey("answer", "FJ")
            .settings.log()
            .wait()
        ,
        newTimer(200)
            .start()
            .wait()
    )
    .log( "ID" , PennController.GetURLParameter("id") )
    .log("file"   , row.Filename )
    .log("isWord" , row.Word     )
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