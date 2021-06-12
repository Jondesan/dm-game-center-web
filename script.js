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


class Character
{
    constructor(name, sex){
        this.name = name;
        this.sex = sex;
        this.race = null;
        this.class = null;
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

function exitPromptDenied(){
    $("#exit-prompt-container").stop(true).fadeOut("fast");
    exitPromptVisible = false;
};

function exitPromptAccepted(){

};

function turnExitPromptVisible(){
    if(!exitPromptVisible){
        exitPromptVisible = true;
        $("#exit-prompt-container").stop(true).fadeIn("fast");
    }
};



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

if(addCharacterBtn){
    addCharacterBtn.addEventListener(   'click',
                                        addCharacterToList(Character(
                                            document.getElementById('new-character-name').value,
                                            0)));
}



function addCharacterToList()
{
    let newCharacter = new Character(document.getElementById('new-character-name').value,0)
    
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


var musicPlayerOn = true;

function turnMusicPlayerOn() {
    if(musicPlayerOn){
        musicPlayerOn = false;
        $("#mmp-shide-btn-icon").animate({height: "10px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({width: "10px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({backgroundColor: "transparent"},{duration: 200, queue: false});
        $(".music-player-container").stop(true).fadeOut("fast");
    }else{
        musicPlayerOn = true;
        $("#mmp-shide-btn-icon").animate({height: "3px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({width: "14px"},{duration: 200, queue: false});
        $("#mmp-shide-btn-icon").animate({backgroundColor: "white"},{duration: 200, queue: false});
        $(".music-player-container").stop(true).fadeIn("slow");
    };
};



var characterCreationAppletOn = true;

function turnCharacterCreationOn() {
    if(characterCreationAppletOn){
        characterCreationAppletOn = false;
        $("#cc-shide-btn-icon").animate({height: "10px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({width: "10px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({backgroundColor: "transparent"},{duration: 200, queue: false});
        $(".character-creation-container").stop(true).fadeOut("fast");
    }else{
        characterCreationAppletOn = true;
        $("#cc-shide-btn-icon").animate({height: "3px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({width: "14px"},{duration: 200, queue: false});
        $("#cc-shide-btn-icon").animate({backgroundColor: "white"},{duration: 200, queue: false});
        $(".character-creation-container").stop(true).fadeIn("slow");
    };
};


var campaignMapAppletOn = true;

function turnCampaignMapOn() {
    if(campaignMapAppletOn){
        campaignMapAppletOn = false;
        $("#camp-map-shide-btn-icon").animate({height: "10px"},{duration: 200, queue: false});
        $("#camp-map-shide-btn-icon").animate({width: "10px"},{duration: 200, queue: false});
        $("#camp-map-shide-btn-icon").animate({backgroundColor: "transparent"},{duration: 200, queue: false});
        $(".main_console_wrapper").stop(true).fadeOut("fast");
    }else{
        campaignMapAppletOn = true;
        $("#camp-map-shide-btn-icon").animate({height: "3px"},{duration: 200, queue: false});
        $("#camp-map-shide-btn-icon").animate({width: "14px"},{duration: 200, queue: false});
        $("#camp-map-shide-btn-icon").animate({backgroundColor: "white"},{duration: 200, queue: false});
        $(".main_console_wrapper").stop(true).fadeIn("slow");
    };
};



var fileMenuOn = false;

function turnFileMenuOn() {
    if(fileMenuOn){
        fileMenuOn = false;
        $("#file-menu").stop(true).fadeOut("fast");
    }else{
        fileMenuOn = true;
        $("#file-menu").stop(true).fadeIn("fast");
    }
};



var navigationOn = false;

function menuDisplay()    
{   
        if (navigationOn) {
        navigationOn = false;
        $(".main_control_bar").stop(true).fadeOut({duration: "500", queue: true});
        /* $(".main_control_container").css(); */
    }else{
        navigationOn = true;
        /* $(".main_control_container").show(); */
        $(".main_control_bar").stop(true).fadeIn({duration: "500", queue: true});
        $(".main_control_bar").css("display","flex");
        if(fileMenuOn){
            fileMenuOn = false;
            $("#file-menu").stop(true).hide();
        }
    }
};



function debugMessage() {
    var e = $(this).text;
    $("#debug-msg-box-text").text($(this).text() + "Button was clicked!");
    
    
    /* $('div.main-control-button').click(function() {
        var text = $(this).text();
        $("#debug-msg-box-text").text(text + " Button was clicked!");
    }); */
};


