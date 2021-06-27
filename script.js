/* var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
}
*/

/* import anime from src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"

$(function(){

    var animation = anime({
        targets: '.square',
        translateX: 600,
        translateY: 600,
        rotate: [180, -180],
        borderRadius: 150,
        duration: 3000,
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
    });
    document.querySelector('.square').onclick = animation
}); */

/* const {character} = require('scripts/character.js'); */

$(document).ready(function() {

/* $("body")
    .hide(0)
    .delay(500)
    .fadeIn(1000); */
    
    
class Character
{
    constructor(name, sex, charclass){
        this.name = name;
        this.sex = sex;
        this.race = null;
        this.charclass = charclass;
        this.level = 1;
        this.experience = 0;
        this.hp = 0;
        this.proficiency = 2;
        /*######### ABILITY SCORES ##############*/
        this.strength = 0;
        this.dexterity = 0;
        this.constitution = 0;
        this.intelligence = 0;
        this.wisdom = 0;
        this.charisma = 0;
        this.abilityScores = [  this.strength,
                                this.dexterity,
                                this.constitution,
                                this.intelligence,
                                this.wisdom,
                                this.charisma    ];
        /* #################################### */
        this.description = null;
        this.bag = [];
        this.armorClass = null;
    }
}


var character_list = [];





var exitPromptVisible = false;
var applicationRunning = true;

$("#exit-prompt-no-btn").click( function(event) {
    $("#exit-prompt-container").stop(true).fadeOut("fast");
    exitPromptVisible = false;
});

$("#exit-prompt-yes-btn"/* "#debug-btn" */).click( function(event) {
    
    if(applicationRunning){
        applicationRunning = false;

        $(".main-content-container div").fadeToggle(1000);
        $("#exit-prompt").fadeToggle(500);
        navigationOn = false;
        $(".main_control_bar").stop(true).fadeOut({duration: "500", queue: true});
        $(".control_bar_display_btn").stop(true).fadeOut(500);
        $(".main-content-container").delay(800).animate(
            {   height: "700",
                borderRadius: "100px",
                marginLeft: "40px",
                marginRight: "40px"},
            1000,
            function() {
                $(this).css(
                    {   display: "flex",
                        "justify-content": "center",
                        "align-items": "center"});
                var goodbye = $("<p id='goodbye-message'></p>")
                    .text("Goodbye!");
                var restartBtn = $("<div id='restart-btn'></div>")
                    .text("Restart");
                $(".main-content-container")
                    .append(goodbye, restartBtn);
                $("#goodbye-message")
                    .hide(  0,
                            "linear",
                            function() {
                                $("#goodbye-message")
                                    .fadeIn("slow")
                                    .animate(
                                        {"letter-spacing": "20px"},
                                        {duration: 3000, easing: "swing", queue: false})
                            });
                $("#restart-btn")
                    .hide(  0,
                            "linear",
                            function() {
                                $("#restart-btn")
                                    .fadeIn("slow");
                            });
            });
        $(document).on("click", "#restart-btn", function() {
            console.log("Restart initiated!");
            location.reload();
        } );
    }
});



$("#main-control-exit-btn").click( function(event) {
    if(!exitPromptVisible){
        exitPromptVisible = true;
        $("#exit-prompt-container").stop(true).fadeIn("fast");
    }
});



var characterIconAddressMap = new Map();
var classList = [   "barbarian",
                    "bard",
                    "cleric",
                    "druid",
                    "fighter",
                    "monk",
                    "paladin",
                    "ranger",
                    "rogue",
                    "sorcerer"];
for(i = 0; i < classList.length; i++) {
    var refString = "img/character_icons/" + classList[i] + "_og.png";
    characterIconAddressMap.set(classList[i],refString);
};





const addCharacterBtn = document.getElementById('add-character-btn');

/* if(addCharacterBtn){
    addCharacterBtn.addEventListener(   'click',
                                        addCharacterToList(Character(
                                            document.getElementById('new-character-name').value,
                                            0,
                                            $("#new-character-class").find(":selected").text() )));
} */



function addCharacterToList()
{
    let newCharacter = new Character(   document.getElementById('new-character-name').value,
                                        0,
                                        $("#new-character-class option:selected").text())
    
    
    
    if(character_list.length != 0)
    {
        for(i = 0; i < character_list.length; i++)
        {
            character_list_names.push(character_list[i].name);
        }
    }else{
        character_list_names = [0]
    }

    if(character_list_names.includes(newCharacter.name)){
        document.getElementById('completion-message').innerHTML = 'Character already exists!';
        document.getElementById('completion-message').style.color = 'red';
        /* var colorChange = anime({
            targets: '#completion-message',
            backgroundColor: ['greenyellow', 'red'],
            easing: 'easeInOutQuad',
        });
        colorChange.play(); */
    }else{
        character_list.push(newCharacter);
        document.getElementById('completion-message').innerHTML = 'Character succesfully added!';
        document.getElementById('completion-message').style.color = 'greenyellow';
        console.log(character_list);
    }
}




var savingThrows = [];
for(i = 0; i < 6; i++) {savingThrows[i] = false};

var skillsThrows = [];
for(i = 0; i < 18; i++) {skillsThrows[i] = false};

var deathsavingThrowsSuc = [];
for(i = 0; i < 3; i++) {deathsavingThrowsSuc[i] = false};

var skills = [  'acrobatics-proficiency-selector',
                'animal-handling-proficiency-selector',
                'arcana-proficiency-selector',
                'athletics-proficiency-selector',
                'deception-proficiency-selector',
                'history-proficiency-selector',
                'insight-proficiency-selector',
                'intimidation-proficiency-selector',
                'investigation-proficiency-selector',
                'medicine-proficiency-selector',
                'nature-proficiency-selector',
                'perception-proficiency-selector',
                'performance-proficiency-selector',
                'persuasion-proficiency-selector',
                'religion-proficiency-selector',
                'sleight-of-hand-proficiency-selector',
                'stealth-proficiency-selector',
                'survival-proficiency-selector'];

var abilities =  [  'strength-proficiency-selector',
                    'dexterity-proficiency-selector',
                    'constitution-proficiency-selector',
                    'intelligence-proficiency-selector',
                    'wisdom-proficiency-selector',
                    'charisma-proficiency-selector'];

var deathSavingThrowsSuccesses = [  'ds-success-first-selector',
                                    'ds-success-second-selector',
                                    'ds-success-third-selector'];

function validateChecks(idIndex) {
    
    var checked = 0;
    
    for(i = 0; i < savingThrows.length; i++) {
        if(savingThrows[i]){checked++};
    };

    if(savingThrows[idIndex]){
        document.getElementById(abilities[idIndex]).style.backgroundColor = 'white';
        savingThrows[idIndex] = false;
    }else if(checked == 2){
        document.getElementById('completion-message').innerHTML = 'Two have already been selected!';
        document.getElementById('completion-message').style.color = 'red';
    }else{
        document.getElementById(abilities[idIndex]).style.backgroundColor = 'darkgrey';
        savingThrows[idIndex] = true;
    };
};

function validateSkillChecks(idIndex) {
    
    var checked = 0;
    
    for(i = 0; i < skillsThrows.length; i++) {
        if(skillsThrows[i]){checked++};
    };

    if(skillsThrows[idIndex]){
        document.getElementById(skills[idIndex]).style.backgroundColor = 'white';
        skillsThrows[idIndex] = false;
    }else if(checked == 4){
        document.getElementById('completion-message').innerHTML = 'Maximum number has already been selected!';
        document.getElementById('completion-message').style.color = 'red';
    }else{
        document.getElementById(skills[idIndex]).style.backgroundColor = 'darkgrey';
        skillsThrows[idIndex] = true;
    };
};

function validateSavingThrowsSuccesses(idIndex) {
    
    var checked = 0;
    
    for(i = 0; i < deathsavingThrowsSuc.length; i++) {
        if(deathsavingThrowsSuc[i]){checked++};
    };

    if(deathsavingThrowsSuc[idIndex]){
        document.getElementById(deathSavingThrowsSuccesses[idIndex]).style.backgroundColor = 'white';
        deathsavingThrowsSuc[idIndex] = false;
    }/* else if(checked == 2){
        document.getElementById('completion-message').innerHTML = 'Two have already been selected!';
        document.getElementById('completion-message').style.color = 'red';
    } */else{
        document.getElementById(deathSavingThrowsSuccesses[idIndex]).style.backgroundColor = 'darkgrey';
        deathsavingThrowsSuc[idIndex] = true;
    };
};




var musicPlayerOn = true;


$("#music-player-shide-btn").click( function() {
    if(musicPlayerOn){
        musicPlayerOn = false;
        $("#mmp-shide-btn-icon").animate({height: "10px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({width: "10px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({backgroundColor: "transparent"},{duration: 200, queue: false});
        $(".music-player-container").stop(true).slideUp("slow");
    }else{
        musicPlayerOn = true;
        $("#mmp-shide-btn-icon").animate({height: "3px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({width: "14px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({backgroundColor: "white"},{duration: 200, queue: false});
        $(".music-player-container").stop(true).slideDown("slow");
    };
});



var characterCreationAppletOn = true;

$("#character-creation-shide-btn").click( function() {
    if(characterCreationAppletOn){
        characterCreationAppletOn = false;
        $("#cc-shide-btn-icon").animate({height: "10px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({width: "10px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({backgroundColor: "transparent"},{duration: 200, queue: false});
        $(".character-creation-container").stop(true).slideUp(800);
    }else{
        characterCreationAppletOn = true;
        $("#cc-shide-btn-icon").animate({height: "3px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({width: "14px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({backgroundColor: "white"},{duration: 200, queue: false});
        $(".character-creation-container").stop(true).slideDown(800);
    };
});


var campaignMapAppletOn = true;

$("#campaign-map-shide-btn").click( function() {
    if(campaignMapAppletOn){
        campaignMapAppletOn = false;
        $("#camp-map-shide-btn-icon").fadeTo("fast",0.6,function(){
            $(this).css("background-image", "url('img/svg/126-up-arrow-1.svg')");
        }).fadeTo("slow", 1);
        $(".main_console_wrapper").stop(true).slideUp(800);
    }else{
        campaignMapAppletOn = true;
        $("#camp-map-shide-btn-icon").fadeTo("fast",0.6,function(){
            $(this).css("background-image", "url(img/svg/093-down-arrow-1.svg)");
        }).fadeTo("slow", 1);
        $(".main_console_wrapper").stop(true).slideDown(800);
    };
});




var hitDiceIncrementsDict = [   "number-of-hit-dice-plus",
                                "number-of-hit-dice-minus",
                                "hit-dice-faces-plus",
                                "hit-dice-faces-minus"];

var diceFaces = [   "4",
                    "6",
                    "8",
                    "10",
                    "12",
                    "20"];

$(".increment-btn").click( function(event) {
    var divId = $(this).attr('id');
    var textArr = $("#total-hit-dice-input-value").val().split("d");
    var textFinal = "";
    console.log(textArr);
    if(divId == hitDiceIncrementsDict[0]) {
        if(textArr[0] < 20) {
            ++textArr[0];
            textFinal = textArr.join("d");
        }else {
            textArr[0] = 1;
            textFinal = textArr.join("d");
        }
    }else if(divId == hitDiceIncrementsDict[1]) {
        if(textArr[0] == 1) {
            textArr[0] = 20;
            textFinal = textArr.join("d");
        }else if(textArr[0] <= 20) {
            --textArr[0];
            textFinal = textArr.join("d");
        }else {
            textArr[0] = 1;
            textFinal = textArr.join("d");
        }
    }else if(divId == hitDiceIncrementsDict[2]) {
        if(textArr[1] == diceFaces[diceFaces.length - 1]) {
            textArr[1] = diceFaces[0];
            textFinal = textArr.join("d");
        }else if(parseInt(textArr[1]) >= parseInt(diceFaces[0]) ) {
            placeIndex = (diceFaces.indexOf(textArr[1])+1);
            textArr[1] = diceFaces[ placeIndex ];
            textFinal = textArr.join("d");
        }
    }else if(divId == hitDiceIncrementsDict[3]) {
        if(parseInt(textArr[1]) == parseInt(diceFaces[0]) ) {
            textArr[1] = diceFaces[parseInt(diceFaces.length - 1)];
            textFinal = textArr.join("d");
        }else if(parseInt(textArr[1]) <= parseInt(diceFaces[parseInt(diceFaces.length - 1)]) ) {
            placeIndex = (diceFaces.indexOf(textArr[1])-1);
            textArr[1] = diceFaces[ placeIndex ];
            textFinal = textArr.join("d");
        }
    }

    /* for(i = 0; i<diceFaces.length; i++){
        console.log("Dice face: " + diceFaces[i]);
    }; */
    console.log({"Id is: ": divId});
    console.log({textFinal});
    $("#total-hit-dice-input-value").val(textFinal);
});







var fileMenuOn = false;


$("#file-btn").click( function(event) {
    if(fileMenuOn){
        fileMenuOn = false;
        $("#file-menu").stop(true,true).fadeOut("fast");
    }else{
        fileMenuOn = true;
        $("#file-menu").stop(true,true).show("slide", { direction: "left" }, 600);
    }
});



var navigationOn = false;

$(".control_bar_display_btn").click( function(event) {
    if (navigationOn) {
        navigationOn = false;
        $(".main_control_bar").stop(true).fadeOut({duration: "500", queue: true});
        /* $(".main_control_container").css(); */
    }else{
        navigationOn = true;
        /* $(".main_control_container").show(); */
        $(".main_control_bar").stop(true).fadeIn({duration: "500", queue: true});
        /* show("slide", { direction: "left" }, 600); */
        $(".main_control_bar").css("display","block");
        if(fileMenuOn){
            fileMenuOn = false;
            $("#file-menu").stop(true).hide();
        }
    }
});



function debugMessage() {
    var e = $(this).text;
    $("#debug-msg-box-text").text($(this).text() + "Button was clicked!");
    
    
    /* $('div.main-control-button').click(function() {
        var text = $(this).text();
        $("#debug-msg-box-text").text(text + " Button was clicked!");
    }); */
};

});
