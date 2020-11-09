// This is the Stroop Test template

// Remove command prefix
PennController.ResetPrefix(null)

// Turn off debugger
// DebugOff()

// Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "<p>In this experiment, you will see a colored word.</p>")
    ,
    newText("instructions-3", "<b>Your task is to evaluate if the coloring is consistent. For example, if the word 'green' is of green color, it is consistent. Otherwise, it is inconsistent.</b>")
    ,
    newText("instructions-4", "<p>Press the <b>T</b> key if the coloring is consistent.<br>Press the <b>F</b> key if the coloring is inconsistent..</p>")
    ,
    newButton("wait", "Click to start the experiment")
        .center()
        .print()
        .wait()
)



// Experimental trial
Template ("StroopTable.csv",
row => newTrial("experimental-trial",
    newText("word", row.Word)
        .color(row.FontColor)
        .center()
        .css("font-size", "100px")
        .print()
    ,
    newKey("keypress", "TF")
        .log()
        .wait()
        )
)

newTrial(
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar",false)
