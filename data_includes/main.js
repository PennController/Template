PennController.ResetPrefix(null) // Shorten command names (keep this line here))

Sequence( "welcome" , randomize("test") , "send" , "final" )

// Welcome screen and logging user's ID

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

// Executing experiment from list1.csv table, where participants are divided into two groups

Template( "list1.csv" , 
    row => PennController( "test" ,
        defaultText.center().print()
        ,
        newText("Instructions", "Press F if what you heard is a word, J otherwise")
        ,
        // Mask, shown on screen for 500ms
        newText("mask","######").print()
        ,
        newTimer(500).start().wait()
        ,                       
        getText("mask").remove()
        ,
        // Prime, shown on screen for 42ms
        newText("prime",row.prime).print()
        ,
        newTimer(42).start().wait()      
        ,
        getText("prime").remove()
        ,
        // Target, shown on screen until F or J is pressed
        newText("target",row.target)
        ,
        getText("Instructions").print()
        ,
        newKey("answerTarget", "FJ").log().wait()
        ,
        getText("target").remove()
        ,
        getText("Instructions").remove()
        ,
        newText("Press SPACE to continue")
        ,
        newKey(" ").wait()
    )
    // Logging participant's group
    .log("Group", row.group)
    // Logging type of prime and target
    .log( "Condition", row.condition)
    // Logging expected answer
    .log("Expected"  , row.expected )
    // Logging if prime is related or not
    .log("Prime Type" , row.primetype )
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
