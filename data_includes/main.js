PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// Show the consent first, then intro page with instructions
// then all the 'experiment' trials in a random order, then send the results and finally show the trial labeled 'end'
Sequence( "consent", "intro", randomize("experiment"), SendResults() , "end" )


// Showing consent, stored in a html file that you can edit 
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

// Showing page with instructions, in a html file that you can edit 
// The audio file was uploaded to Resources
newTrial( "intro" ,
    newHtml("intro.html")
        .print()
    ,
    newButton("Continue.")
        .center()
        .print()
        .wait()
    ,
    newHtml("AudioInstructions.html")
        .print()
    ,
    newText("When you understand these instructions, please click Continue.")
        .center()
        .print()
    ,
    newAudio("Instructions.mp3")
        .play()
        .wait()
    ,
    newButton("Continue")
        .center()
        .print()
        .wait()
)


// Starting the experiment, by using data from csv file we made previously
Template ("extable.csv", row => 
  newTrial("experiment",
    // All the images will have the same size: 200px*200px
    defaultImage.size(200,200)
    ,
    newCanvas("images", 1100, 500)  // 500px height: we will print the button at the bottom
        .color("white")             // Use a white background
        .add(  0 , 0 , newImage("1", row.image1) )
        .add(300 , 0 , newImage("2", row.image2) )
        .add(600 , 0 , newImage("3", row.image3) )
        .add(900 , 0 , newImage("4", row.image4) )
        .print("center at 50vw","top at 2em")
    ,
    // These are the feedback tooltips, in case the mouse moves too early or click is too late
    newTooltip("earlyWarning", "STARTED TOO EARLY. You moved your mouse from the Go button before it was possible to guess the correct option. Please don't move your mouse until you're about to click.")
    ,
    newTooltip("slowClickWarning", "CLICKED TOO LATE. You took too long to click on your selection. Please try to click faster next time!")
    ,
    // Give 2s to preview the images
    newTimer(2000)
        .start()
        .wait()
    ,
    // This button is horizontally centered, at the bottom of the 1100px*500px surface:
    // that's where the cursor will be when we start tracking the mouse
    newButton("Go")
        .print( "center at 50%" , "bottom at 100%" , getCanvas("images") )
        .wait()
        .remove()
    ,
    newVar("isEarly", false).global()   // Global to access it in newTrial().log
    ,
    newVar("slowClick", false).global() // Global to access it in newTrial().log 
    ,
    // Launch timers to detect early movement and late clicks
    newTimer("earlyStart", (parseInt(row.NPTime) - 200) ).start()
    ,
    newTimer("timeLimit", (parseInt(row.audiodur) + 2000) ).start()
    ,
    // Start tracking mouse movements and clicks
    newMouseTracker("mouse")
        .log()
        // Check the earlyStart timer whenever the mouse moves:
        // set the "isEarly" Var element to true if the timer is still running
        .callback( getTimer("earlyStart").test.running().success(getVar("isEarly").set(true)) )
        .start()
    ,
    // Play the audio description
    newAudio("description", row.audiofile).play()
    ,
    // Make the images clickable
    newSelector()
        .add( getImage("1") , getImage("2") , getImage("3") , getImage("4"))
        .log()
        .wait()
    ,
    // If the "timeLimit" timer has ended by the time an image is clicked, set "slowClick" to true
    getTimer("timeLimit").test.ended().success(getVar("slowClick").set(true))
    ,
    // Make sure the description is done playing before proceeding
    getAudio("description").wait("first")
    ,
    // Stop the mouse tracker to avoid massive resuls files
    getMouseTracker("mouse").stop()
    ,
    // Show feedback if necessary
    getVar("isEarly").test.is(true).success(
        getTooltip("earlyWarning")
            .print( "center at 50%", "middle at 50%" , getCanvas("images"))
            .wait()
    )
    ,
    getVar("slowClick").test.is(true).success(
        getTooltip("slowClickWarning")
            .print( "center at 50%", "middle at 50%" , getCanvas("images"))
            .wait()
    )
  )
  // Log the participant's id, passed as a parameter in the URL (?id=...)
  .log( "id"                , GetURLParameter("id") )
  // Log values from table and from Var elements
  .log( "Target"            , row.targetlocation )
  .log( "NPTime"            , row.NPTime )
  .log( "audiodur"          , row.audiodur )
  .log( "EarlyStartMessage" , getVar("isEarly") )
  .log( "TooSlowMessage"    , getVar("slowClick") )
)


// The end of the experiment
newTrial("end",
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This is a dummy link, it won't actually validate submissions; use the link provided by your pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Wait on this page forever
    newButton().wait()
)
.setOption("countsForProgressBar",false)
