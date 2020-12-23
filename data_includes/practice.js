// Showing practice page, where user will be notified if he did the task correctly
// This serves to ensure that user understands what is he instructed to do 
newTrial( "practice1" ,
    newCanvas("contextContainer", 450, 300)
        .center()
        .add( 0, 0, newImage("contextPicture", "ctl_train_t_1_con.png") )
        .print()
    ,
    defaultTooltip
        .key(32,"no click")
        .position("top left")
        .frame()
        .size(500,"auto")
    ,
    // Showing explanations using tooltips
    newTooltip("guide", "This picture shows what happened during the morning race.", "Press Space")
        .print( 0, 320, getCanvas("contextContainer") )
        .wait()
    ,
    getTooltip("guide")
        .text("This animal fell over. He didn't finish the race!")
        .print( 75,140, getCanvas("contextContainer") )
        .wait()
    ,
    getTooltip("guide")
        .text("This is the finish line. The animals past this line finished the race!")
        .print( 160,230, getCanvas("contextContainer") )
        .wait()
    ,
    getTooltip("guide")
        .text("These animals stayed at home. They didn't take part in the race!")
        .print( 380,220, getCanvas("contextContainer") )
        .wait()
    ,
    // Putting audio of the experiment
    newAudio("audioContext", "ctl_train_t_1_con.mp3")
        .play()
        .wait()
    ,
    getCanvas("contextContainer")
        .remove()
    ,
    newCanvas("testContainer", 900, 340)
        .center()
        .add(  0 , 0 , newImage("visible", "ctl_train_f_1_con.png") )
        .add(450 , 0 , newImage("covered", "coveredpicture.png") )
        .add( "center at 225px" , 320 , newText("F").bold() )
        .add( "center at 675px" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("audioTest", "ctl_train_t_1_tar.mp3")
        .play()
        .wait()
    ,
    newTooltip("press", "Now simply press F if you think what you heard was describing the situation in the visible picture...", "Press Space to continue")
        .position("bottom center")
        .print(getImage("visible"))
        .wait()
    ,
    getTooltip("press")
        .text("...or J if you think it was describing the situation hidden behind the black layer.")
        .print(getImage("covered"))
        .wait()
    ,
    // Adding selector for choosing picture
    newSelector()
        .add( getImage("visible") , getImage("covered"))
        .disableClicks()
        .keys("F", "J")
        .once()
        .log()
        .wait()
        .test.selected(getImage("visible"))
        .success(newText("Right! The sentence described the VISIBLE picture; "+
            "there was no cat in the race. Press any key to continue.")
            .italic().print()
        )
        .failure(newText("Wrong! The sentence described the VISIBLE picture; "+
            "there was no cat in the race. Press any key to continue.")
            .color("red").print()
        )
    ,
    newKey("").wait()
)

// Showing practice page, where user will be notified if he did the task correctly
// This serves to ensure that user understands what is he instructed to do, but with less instructions than practice 1 
newTrial( "practice2" ,
    newImage("contextPicture", "ctl_train_f_1_con.png")
        .center()
        .print()
    ,
    newAudio("audioContext", "ctl_train_f_1_con.mp3")
        .play()
        .wait()
    ,
    newCanvas("container", 900, 340)
        .center()
        .add(  0 , 0 , getImage("contextPicture") ) // Re-using the same picture here
        .add(450 , 0 , newImage("covered", "coveredpicture.png") )
        .add( "center at 225px" , 320 , newText("F").bold() )
        .add( "center at 675px" , 320 , newText("J").bold() )
        .print()
    ,
    newAudio("audioTest", "ctl_train_f_1_tar.mp3")
        .play()
    ,
    newSelector()
        .add( getImage("contextPicture") , getImage("covered"))
        .disableClicks()
        .once()
        .keys("F", "J")
        .log()
        .wait()
        .test.selected(getImage("covered"))
        .success(newText("Right! The sentence described the COVERED picture; "+
            "there was one donkey in the race in the visible picture. Press any key to continue.")
            .italic().print()
        )
        .failure(newText("Wrong! The sentence described the COVERED picture; "+
            "there was one donkey in the race in the visible picture. Press any key to continue.")
            .color("red").print()
        )
    ,
    getAudio("audioTest")
        .wait("first")
    ,
    newKey(" ").wait()
)