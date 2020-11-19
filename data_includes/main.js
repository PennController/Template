// This is a template for mouse tracker, feel free to edit it and adjust it
// Find a tutorial and the list of availalbe elements at:
// https://www.pcibex.net/documentation/

PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// To turn off debugger uncomment the next line
// DebugOff()

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'

Sequence( "consent", "intro", randomize("experiment"), SendResults() , "end" )

// Showing consent, generated throughout html file that you can edit 

newTrial ( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
        .print()
    ,
    newButton("<p>I have read the consent statement and I agree to continue.")
        .center()
        .print()
        .wait()
)

// Showing page with instructions, generated throughout html file that you can edit 
// Futhermore, you have an option of changing audio of instruction, by uploading it 

newTrial( "intro" ,
    newHtml("intro_page", "intro.html")
        .print()
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
    ,
    newAudio("instructAudio", "Instructions.mp3")
        .play()
    ,
    newHtml("instruct_page", "AudioInstructions.html")
        .print()
    ,
    newText("<p>When you understand these instructions, please click Continue.")
        .center()
        .print()
    ,
    getAudio("instructAudio")
        .wait("first")
    ,
    newButton("<p>Continue.")
        .center()
        .print()
        .wait()
)



// Starting the experiment, by using data from csv file we made previously

Template ("extable.csv",
row => newTrial("experiment",
    newImage("1", row.image1)
        .size(200,200)
    ,
    newImage("2", row.image2)
        .size(200,200)
    ,
    newImage("3", row.image3)
        .size(200,200)
    ,
    newImage("4", row.image4)
        .size(200,200)
    ,
    newCanvas("images", 1400, 200)
        .center()
        .add(350   , 0 , getImage("1") )
        .add(650 , 0 , getImage("2") )
        .add(850 , 0 , getImage("3") )
        .add(1050, 0 , getImage("4") )
        .print()
    ,
    newAudio("description", row.audiofile)
    ,
    newVar("isEarly", 0)
    ,
    newTooltip("earlyWarning", "STARTED TOO EARLY. You moved your mouse from the Go button before it was possible to guess the correct option. Please don't move your mouse until you're about to click.")
        .position("top center")
    ,
    newVar("slowClick", 0)
    ,
    newTooltip("slowClickWarning", "CLICKED TOO LATE. You took too long to click on your selection. Please try to click faster next time!")
        .position("top center")
    ,
    newTimer(2000) // 2000 ms to preview images
        .start()
        .wait()
    ,
    newButton("Go")
        .print( "center at 50vw" , "center at 90vh" )
        .wait()
        .remove()
    ,
    newTimer("earlyStart", (parseInt(row.NPTime) - 200) )
    ,
    newTimer("timeLimit", (parseInt(row.audiodur) + 2000) )
    ,
    newMouseTracker("mouse")
        .log()
        .callback( getTimer("earlyStart").test.running().success(getVar("isEarly").set(1)) )
        .start()
    ,
    getAudio("description")
        .play()
    ,
    getTimer("earlyStart")
        .start()
    ,
    getTimer("timeLimit")
        .start()
    ,
    newSelector()
        .add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .callback( getTimer("timeLimit").test.ended().success(getVar("slowClick").set(1)) )
        .log()
        .wait()
    ,
    getAudio("description")
       .wait("first")
    ,
    getMouseTracker("mouse")
        .stop()
    ,
    getVar("isEarly")
        .test.is(1).success(getTooltip("earlyWarning").print().wait())
    ,
    getVar("slowClick")
        .test.is(1).success(getTooltip("slowClickWarning").print().wait())
  )
  .log( "ID"     , getVar("ID")    )
  .log( "Target"   , row.targetlocation  )
  .log( "EarlyStartMessage" , getVar("isEarly") )
  .log( "TooSlowMessage" , getVar("slowClick") ) )



// The end of the experiment
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
