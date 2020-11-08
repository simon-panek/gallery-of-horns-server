'use strict';

let keywordArray = [];
let sortSwitch;
let page = 'home';


function Creatures(creature) {

  this.image_url = creature.image_url;
  this.title = creature.title;
  this.description = creature.description;
  this.keyword = creature.keyword;
  this.horns = creature.horns;

}
// getting div section from HTML, cloning it, and appending to main section
Creatures.prototype.render = function () {

  if (!keywordArray.includes(this.keyword)) {

    keywordArray.push(this.keyword);
  }
  let $template = $('#photo-template').html();
  let html = Mustache.render($template, this);
  return html;
}
function renderOptions() { //creates an option element for each keyword option and appending to the select
  $('#selectElement').empty();

  keywordArray.forEach(keywordOption => {

    let optionTag = $(`<option>${keywordOption}</option>`);

    $('#selectElement').append(optionTag);

  })
}

function userSelection() {

  renderOptions();

  $('select').on('change', function () {
    keywordArray.forEach(newClass => {
      let classOn = '.' + newClass;
      $(classOn).show();
    });
    let src = $(this).find(':selected').text();
    keywordArray.forEach(match => {
      if (src !== match) {
        let check = '.' + match;
        $(check).hide();
      }
    });
  })

}

Creatures.allCreatures = [];

Creatures.readJson = () => {

  const ajaxSetting = { method: 'get', dataType: 'json' };
  Creatures.allCreatures = [];
  keywordArray = [];
  $.ajax('./data/page-1.json', ajaxSetting)
    .then(data => {

      let copyData = data;
      copyData.sort((a, b) => sortSwitch === 'title' ? ((a.title > b.title) ? 1 : -1) : ((a.horns > b.horns) ? 1 : -1));
      data.forEach(hornInfo => {
        Creatures.allCreatures.push(new Creatures(hornInfo));
      });
      $('div').remove();



      Creatures.allCreatures.forEach(image => {
        $('main').append(image.render())
      })
      userSelection();
    });

}

Creatures.page2ReadJson = () => { //bring in data from page2.json


  const ajaxSetting = { method: 'get', dataType: 'json' };

  Creatures.allCreatures = [];
  keywordArray = [];
  $.ajax('./data/page-2.json', ajaxSetting)
    .then(data => {

      let copyData = data;
      copyData.sort((a, b) => sortSwitch === 'title' ? ((a.title > b.title) ? 1 : -1) : ((a.horns > b.horns) ? 1 : -1));

      data.forEach(hornInfoPage2 => {

        Creatures.allCreatures.push(new Creatures(hornInfoPage2));
      });

      $('div').remove();

      Creatures.allCreatures.forEach(image => {
        $('main').append(image.render())
      })

      userSelection();
    });
}

const buttonPage2Listener = () => {
  $('#page2').click(Creatures.page2ReadJson);
  page = 'home';
};

const buttonHomeListener = () => {

  $('#homeButton').click(Creatures.readJson);
  page ='page2';
};

const whichClick = () => {

  let checkRadio = $('input[name="sort"]:checked').val();

  if (checkRadio === 'alpha') {
    sortSwitch = 'title';
  } else {
    sortSwitch = 'horns';

  }

  if (page === 'horns'){
    Creatures.page2ReadJson();
  } else {
    Creatures.readJson();
  }

}

const sortListener = () => {

  Creatures.readJson();

  $('#sortUl').click(whichClick);

  buttonPage2Listener();
  buttonHomeListener();

};

$(() => sortListener());
//buttonPage2Listener();
//buttonHomeListener();

//$(() => Creatures.readJson());
