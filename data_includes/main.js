PennController.ResetPrefix(null);

// Preload the ZIP files (will start with the top one)
PennController.PreloadZip("https://www.ling.upenn.edu/~creemers/Soundfiles/Soundfiles_Practice.zip")
PennController.PreloadZip("https://www.ling.upenn.edu/~creemers/Soundfiles/Soundfiles_Exp1a.zip")

// Sequence of trials, based on their labels
PennController.Sequence( "welcome" , "practice" , "break" , "preload" ,
                         "Experimental1" , "break" , "Experimental2" , "send" , "final" )
                          // Notice "send" before "final" --- refers to SendResults below


// PennController.DebugOff()    // Uncomment when ready to publish

// The welcome trial simply prints an HTML page and a "Start" button
PennController( "welcome" ,
    newHtml("consent.html")
      .print()
    ,
    newButton("Start")
        .print()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )     // This will add the ID at the end of the results line
.setOption("hideProgressBar", true)                     // We don't show the progress bar for this trial


// This creates a trial (labeled "preload"---see Sequence above) that only moves on when all the resources 
// (ie all the audio files) used by the trials labeled Experimental1 and Experimental2 have been preloaded 
PennController.CheckPreloaded( "Experimental1" , "Experimental2" ).label("preload")

// This generates trials using the file AvaPractice.csv from chunk_includes
PennController.Template( "AvaPractice.csv" , 
    row => PennController( "practice" ,     // all these trials will be labeled 'practice' (see Sequence above)
        newTimer(1000-200*Math.random())    // Same trick as from Rob's script
            .start()
            .wait()
        ,
        newText("F", "F: Nonword")          // We create the Text elements in cache (not printed yet)
          .settings.bold()
        ,
        newText("J", "J: Word")
          .settings.bold()
        ,
        newCanvas("text", "80%", "40px")    // Width = 80% of the content space
            .settings.add(               0 , 0 ,  getText("F") )
            .settings.add( "right at 100%" , 0 ,  getText("J") )    // aligned to the right edge
            .print()                        // Prints the Canvas along with its Text elements
        ,
        newAudio("prime", row.Prime)
            .settings.log("play","end")     // Logging when it starts and ends playing
            .play()
        ,
        newKey("answerPrime", "FJ")
            .settings.log("all")            // Empty parameter (defaulting to "wait") bugs
            .wait()
            .settings.disable()             // Just making sure only first keypress gets recorded
        ,
        getAudio("prime")                   // The key has been pressed (cf 'wait' on newKey above)
            .wait("first")                  // Now wait until audio has ended *if has not ended yet*
        ,
        getCanvas("text")
            .remove()
        ,
        newText("feedbackPrime", row.CorrectPrime)
          .settings.bold()
          .print()
        ,
        newTimer(1100-200*Math.random())
            .start()
            .wait()
        ,
        getText("feedbackPrime")
          .remove()
        ,
        getCanvas("text")
            .print()
        ,
        newAudio("target", row.Target)
            .settings.log("play","end")
            .play()
        ,
        newKey("answerTarget", "FJ")
            .settings.log("all")
            .wait()
            .settings.disable()
        ,
        getAudio("target")
            .wait("first")
        ,
        getCanvas("text")
          .remove()
        ,
        newText("feedbackTarget", row.CorrectTarget)
          .settings.bold()
          .print()
        ,
        newTimer(900)
          .start()
          .wait()
    )
    .log( "ID" , PennController.GetURLParameter("id") )
    .log("Prime"  , row.Prime  )
    .log("Target" , row.Target )
)


// This generates trials using the file AvaExp.csv from chunk_includes
PennController.Template( "AvaExp.csv" , 
    row => PennController( row.Type ,           // These trials will be labeled from the Type column
        newTimer(1000-200*Math.random())
            .start()
            .wait()
        ,
        newText("F", "F: Nonword")
          .settings.bold()
        ,
        newText("J", "J: Word")
          .settings.bold()
        ,
        newCanvas("text", "80%", "40px")
            .settings.add(               0 , 0 ,  getText("F") )
            .settings.add( "right at 100%" , 0 ,  getText("J") )
            .print()
        ,
        newVar("primeRT", 0)                // This will store the RT for the prime
          .settings.global()                // Global so we can use it inside log below
          .set( v => Date.now() )           // Set it to the timestamp immediately before audio.play
        ,
        newAudio("prime", row.Prime)
            .settings.log("play","end")
            .play()
        ,
        newKey("answerPrime", "FJ")
            .settings.log("all")
            .wait()
            .settings.disable()
        ,
        getVar("primeRT")                   // The key has been pressed (cf wait on newKey above)
          .set( v => Date.now() - v )       // Set it to current timestamp - previous timestamp (v)
        ,
        getAudio("prime")
            .wait("first")
        ,
        getCanvas("text")
            .remove()
        ,
        newTimer(1100-200*Math.random())
            .start()
            .wait()
        ,
        getCanvas("text")
            .print()
        ,
        newVar("targetRT", 0)               // Same as above, but for target this time
          .settings.global()
          .set( v => Date.now() )
        ,
        newAudio("target", row.Target)
            .settings.log("play","end")
            .play()
        ,
        newKey("answerTarget", "FJ")
            .settings.log("all")
            .wait()
            .settings.disable()
        ,
        getVar("targetRT")
            .set( v => Date.now() - v )
        ,
        getAudio("target")
            .wait("first")
        ,
        getCanvas("text")
            .remove()
    )
    .log( "ID" , PennController.GetURLParameter("id") )
    .log("Prime"  , row.Prime  )
    .log("Target" , row.Target )
    .log("primeRT" , getVar("primeRT") )        // Will append the values of primeRT and
    .log("targetRT" , getVar("targetRT") )      // targetRT to all of the trial's results lines 
)


// This creates a trial labeled "break." We show it twice---see Sequence above
PennController( "break" ,
      newText("You may now take a short break")
        .print()
      ,
      newButton("Break finished")
        .print()
        .wait()
)

// This is necessary to send the results *before* showing the final (everlasting) screen
PennController.SendResults("send")

// This creates the final screen
PennController( "final" ,
    newText("Thank you for taking this experiment!")
        .print()
    ,
    newTimer(1)
        .wait()                 // This will wait forever, because the Timer was never started
)
.setOption("countsForProgressBar", false)
