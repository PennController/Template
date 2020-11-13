/ This is the Stroop Test template

// Remove command prefix
PennController.ResetPrefix(null)

// Turn off debugger
// DebugOff()

Sequence("instructions","learning-phase","guessing-phase",randomize("guessing-phase-start"), SendResults(), "end")

// Instructions
newTrial("instructions",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Welcome!")
    ,
    newText("instructions-2", "<p>Your task will be to remember the word pairs. </p>")
    ,
    newText("instructions-3", "<b>We'll first show you two words at a time, and later ask you to recall these words in combination.</b>")
    ,
    newText("instructions-4", "<p>Are you ready?</p>")
    ,
    newText("<p>Please type in your ID below and then click on the Start button to start the experiment.</p>")
    ,
    newText("emptyrow","<p></p>")
    ,
    newTextInput("ID", "")
        .center()
        .print()
    ,
    newText("emptyrow","<p></p>")
    ,
    newButton("Start")
        .center()
        .print()
        .wait( getTextInput("ID").testNot.text("") )
    ,
    newText("emptyrow","<p></p>")
    ,
    newVar("ID","")
        .global()
        .set( getTextInput("ID") )
)

// Learning phase

Template ("WordsTable.csv",
row => newTrial("learning-phase",
    newText("sentence", "Please remember the following pair")
            .center()
            .print()
        ,
    newText("emptyrow","<p></p>")
    ,
    newText("word1", row.word1)
            .center()
            .css("font-size", "60px")
            .print()
        ,
    newText("emptyrow","<p></p>")
    ,
        newText("word2", row.word2)
            .center()
            .css("font-size", "60px")
            .print()
        ,
        newTimer(3000)
            .start()
            .wait()
    ))
    
    
// Guessing phase 

newTrial("guessing-phase",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "We'll now ask you to recall the words you have just seen in pairs.")
    ,
    newText("emptyrow","<p></p>")
    ,
    newButton("Start")
        .center()
        .print()
        .wait()
)

 Template ("WordsTable.csv", 
  row =>  newTrial("guessing-phase-start",
    defaultText
        .center()
        .print()
    ,
    newText("instructions-1", "Please enter the pairs of words you just saw."),
    newText("emptyrow","<p></p>")
    ,
    newText("instructions-2","After each pair, please use the submit button to save your entry.")
    ,
    newText("emptyrow","<p></p>")
    ,
    newText("instructions-3","First word is: ")
    ,
    newText("loggedword1", row.word1).size("100px").bold()
    ,
    newText("emptyrow","<p></p>")
    ,
    newTextInput("loggedword2").size("100px")
    ,
    newCanvas("Canvas", 600, 320)
        .add( 0,    40, newText("<b>Input second word:</b>"))
        .add( 400,  40, getTextInput("loggedword2").log())
        .print()
    ,
    newText("Warning", "Please enter the word!")
        .color("red")
        .italic()
        .center()
        .hidden()
        .print()
    ,
    newButton("Next") 
        .center()
        .print()
        .wait( getTextInput("loggedword2").test.text(/.+/)
            .failure( 
                getText("Warning").hidden()
                ,
                newTimer(100).start().wait()
                ,
                getText("Warning").visible() 
            )
        )
        ,
    newVar("loggedword2").global().set( getTextInput("loggedword2"))
)
.log("loggedword2", getVar("loggedword2"))
.log("word1", row.word1))

newTrial("end",
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
