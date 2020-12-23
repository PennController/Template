PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// Instructions scree
newTrial("instructions",
    // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newText("Welcome!")
    ,
    newText("In this experiment, you will see a colored word.")
    ,
    // Note: the \ character allows you to continue the string on the next line
    newText("<strong>Your task is to evaluate if the coloring is consistent. \
            For example, if the word 'green' is of green color, it is consistent. \
            Otherwise, it is inconsistent.</strong>")
    ,
    newText("<p>Press the <strong>F</strong> key if the coloring is consistent.</p>\
             <p>Press the <strong>J</strong> key if the coloring is inconsistent.</p>")
    ,
    newButton("Click to start the experiment")
        .center()
        .print()
        .wait()     // Finish this trial only when the button is clicked
)

// Experimental trials: generate trials using the values from StroopTable.csv
Template( "StroopTable.csv" , row => 
  newTrial( "experimental-trial" ,
    defaultText.center()            // Horizontally center all Text elements automatically
    ,
    newText("word", row.Word)       // Show the text from the 'Word' column
        .color(row.FontColor)       // Color the text as specified in the 'FontColor' column
        .css("font-size", "24pt")   // Increase the font size
        .log()                      // Reports when the Text is displayed in the results file
        .print()
    ,
    newKey("keypress", "FJ")
        .log()                      // Reports when the key is pressed in the results file
        .wait()
        .test.pressed( row.CorrectKey )
        .success( newText("Good job!").print() )
        .failure( newText("Wrong anser!").print() )
    ,
    // Wait 1s before moving to the next trial
    newTimer(1000).start().wait()
  )
  .log( "word"    , row.Word       ) // Append the value of 'Word' at the end of the results lines
  .log( "color"   , row.FontColor  ) // Append the value of 'FontColor' at the end of the results lines
  .log( "correct" , row.CorrectKey ) // Append the value of 'CorrectKey' at the end of the results lines
)

SendResults()   // Send the results

// Final screen
newTrial(
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText("<a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a>")
        .center()
        .print()
    ,
    // Trick: wait here forever
    newButton().wait()
)
.setOption("countsForProgressBar",false) // This is not a "real" trial
