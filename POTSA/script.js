let unete_on = false;
let unete_disabled = false;

function uneteanosotros() {
	if (unete_on == false && unete_disabled == false) {

		audio0.play();
		html.style.filter = "contrast(200%)";

		unete_on = true;
	} else if (unete_on == true && unete_disabled == false) {

		audio0.pause();
		audio0.currentTime = 0;
		html.style.filter = "contrast(100%)";

		unete_on = false;
	} else {
		return;
	}
}

function randomHitSound() {
	let soundNum = (Math.floor(Math.random() * 3));

	if (soundNum == 0) {

		hit_sound_0.load();
		hit_sound_0.play();
	} else if (soundNum == 1) {

		hit_sound_1.load();
		hit_sound_1.play();
	} else if (soundNum == 2) {

		hit_sound_2.load();
		hit_sound_2.play();
	} else {
		return;
	}
}


function goto_potsahtml() {
	randomHitSound();
	potsa_confirm.style.display = 'none';

	setTimeout(function(){
		music0.pause();
		music0.currentTime = 0;
		window.open('files/potsa.html', '_blank');
		ambient_loop_0.play();
	},1000); //wait a second to open 'potsa.html'
}

function potsa_trigger() {
	if (unete_on == true) {uneteanosotros();}
	unete_disabled = true;

	randomHitSound();
	success_sfx_err.load();
	success_sfx_err.play();

	setTimeout(function(){
		body.style.backgroundImage = "url('media/potsa_fly.gif')"
		body.style.cursor = 'inherit';
		html.style.filter = "contrast(200%)";
		document.getElementById('potsa_say').style.opacity = '40%';

		music0.play();

		setTimeout(function(){
			potsa_confirm.style.display = 'block';
			success_sfx.play();

		},60000); //timeout redirect 1 minute.

	},1000); //timeout potsachanges 1 second.
}

// POTSA
const wd = "potsa";
let currentIndex = 0;
let potsa_triggered = false;

document.addEventListener("keydown", (e) => {
  	let key = e.key.toLowerCase();

  	if (key.length === 1 && key.match(/[a-zñ]/) && potsa_triggered === false) {
   		if (key === wd[currentIndex]) {

      		if (unete_on == true) {uneteanosotros();}

      		if (currentIndex == 0) {
      			body.style.backgroundImage = "url('media/potsa_god.png')";

      		} else if (currentIndex == 1) {
      			body.style.backgroundImage = "url('media/potsa_free.png')";

      		} else if (currentIndex == 2) {
      			body.style.backgroundImage = "url('media/dpyPotsa.gif')";

      		} else if (currentIndex == 3) {
      			body.style.backgroundImage = "url('media/sebusca.jpg')";

      		} else if (currentIndex == 4) {
      			body.style.backgroundImage = "url('media/retrotsa.png')";
      		}

      		console.log(`"${key}" (${currentIndex + 1}/${wd.length})`);

      		const currentText = wd.substring(0, currentIndex + 1);
      		document.getElementById('potsa_say').textContent = currentText;

      		randomHitSound();
      		currentIndex++;

      		if (currentIndex === wd.length) {
        		console.log(wd + " !!!!!!!");
        		currentIndex = 0;
        		potsa_triggered = true;

        		potsa_trigger();
      		}
    	} else {return;}
  	}
});


document.addEventListener('keydown', event =>  {
  if (event.code === 'Space' | event.code === 'Enter') {
    uneteanosotros();
  }
});